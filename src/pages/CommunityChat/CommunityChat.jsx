import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/Header/Header";
import { useUser } from "../../context/UserContext";
import axios from "axios";
import { io } from "socket.io-client";
import Conversation from "../../components/Conversation/Conversation";
import Message from "../../components/Message/Message";
import { backend_url } from "../../server";
import "./CommunityChat.css";
import { useParams } from "react-router-dom";
import GeneralChat from "../../components/GeneralChat/GeneralChat";
import { FaPaperPlane } from "react-icons/fa";
import jsPDF from "jspdf";
import OfferPopup from "../../components/OfferPopup/OfferPopup.jsx";
import { BiDollar } from "react-icons/bi";
import { Modal, Button, Form } from "react-bootstrap";
function CommunityChat() {
  const [conversations, setConversations] = useState([]);
  const [channels, setChannels] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [offer, setOffer] = useState(null);
  const socket = useRef();
  const { user } = useUser();
  const scrollRef = useRef();
  const { conversationId } = useParams();
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [offerAmount, setOfferAmount] = useState("");
  const openOfferModal = () => {
    setShowOfferModal(true);
  };

  const closeOfferModal = () => {
    setShowOfferModal(false);
    setOfferAmount("");
  };

  const handleSendOffer = () => {
    if (offerAmount) {
      sendOffer(offerAmount);
      closeOfferModal();
    }
  };

  useEffect(() => {
    socket.current = io("http://localhost:4000");

    socket.current.on("receiveOffer", (data) => {
      console.log("Received offer:", data);
      setOffer(data); // Set the offer state to display the popup
      setTimeout(() => {
        setOffer(null); // Discard the offer after 1 minute
      }, 60000); // 1 minute
    });

    // Listen for incoming messages
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });

    // Listen for typing indicators
    socket.current.on("typing", ({ senderId }) => {
      if (senderId !== user._id) {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 2000);
      }
    });

    // Listen for online users
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users);
    });

    // Add the current user to the online users list
    socket.current.emit("addUser", user._id);
    socket.current.on("generateContract", async (data) => {
      await axios
        .get(`${backend_url}/auth/get-user/${data.receiverId}`)
        .then((res) => {
          data.senderName = res.data.user.name;
          data.senderEmail = res.data.user.email;
        });
      generateContract(data);
    });
    // Cleanup on component unmount
    return () => {
      socket.current.disconnect();
    };
  }, [user._id]);

  // Fetch conversations for the current user
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`${backend_url}/conversations/${user._id}`);
        setConversations(res.data);

        if (conversationId) {
          const selectedConv = res.data.find((c) => c._id === conversationId);
          if (selectedConv) {
            setCurrentChat(selectedConv);
            setSelectedConversation(selectedConv._id);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    getConversations();
  }, [user._id, conversationId]);

  // Fetch messages for the current chat
  useEffect(() => {
    const getMessages = async () => {
      try {
        if (currentChat) {
          const res = await axios.get(
            `${backend_url}/messages/${currentChat._id}`
          );
          setMessages(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getMessages();
  }, [currentChat]);

  // Handle arrival of new messages
  useEffect(() => {
    arrivalMessage &&
      (selectedChannel ||
        currentChat?.members.includes(arrivalMessage.sender)) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat, selectedChannel]);

  // Handle typing indicator
  const handleTyping = () => {
    if (selectedChannel) {
      socket.current.emit("typing", {
        senderId: user._id,
        channelId: selectedChannel,
      });
    } else {
      const receiverId = currentChat.members.find(
        (member) => member !== user._id
      );
      socket.current.emit("typing", { senderId: user._id, receiverId });
    }
  };

  // Handle sending a new message
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat?._id,
      channelId: selectedChannel,
    };

    if (selectedChannel) {
      socket.current.emit("sendMessage", {
        senderId: user._id,
        text: newMessage,
        channelId: selectedChannel,
      });
    } else {
      const receiverId = currentChat.members.find(
        (member) => member !== user._id
      );
      socket.current.emit("sendMessage", {
        senderId: user._id,
        receiverId,
        text: newMessage,
      });
    }

    try {
      const res = await axios.post(`${backend_url}/messages`, message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  // Handle sending an offer
  const sendOffer = (amount) => {
    if (user.role === "Contractor" && currentChat) {
      const receiverId = currentChat.members.find(
        (member) => member !== user._id
      );
      const offerData = {
        senderId: user._id,
        receiverId,
        amount,
        conversationId: currentChat._id,
      };
      console.log("Sending offer:", offerData); // Debugging: Log the offer data
      socket.current.emit("sendOffer", offerData); // Emit the offer to the server
    }
  };

  const handleAcceptOffer = () => {
    if (offer) {
      const contractData = {
        senderId: offer.senderId,
        receiverId: user._id,
        amount: offer.amount,
        conversationId: offer.conversationId,
      };
      socket.current.emit("acceptOffer", contractData); // Emit acceptance to the server
      setOffer(null); // Clear the offer state
    }
  };

  // Handle rejecting an offer
  const handleRejectOffer = () => {
    setOffer(null); // Clear the offer state
  };

  // Generate and download the contract PDF
  const generateContract = (data) => {
    const doc = new jsPDF();

    // Set font and size for the title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Contract Agreement", 105, 20, { align: "center" });

    // Add a horizontal line below the title
    doc.setLineWidth(0.5);
    doc.line(20, 25, 190, 25);

    // Set font and size for the body
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    // Add contract details
    doc.text(
      "This Agreement is made and entered into on this " +
        new Date().toLocaleDateString(),
      20,
      40
    );
    doc.text("by and between:", 20, 50);

    // Sender details
    doc.text(
      `1. ${data.senderName} (hereinafter referred to as "Contractor")`,
      20,
      60
    );

    doc.text(`   - Email: ${data.senderEmail}`, 20, 70);

    // Receiver details
    doc.text(`2. ${user.name} (hereinafter referred to as "User")`, 20, 90);
    doc.text(`   - Email: ${user.email}`, 20, 100);

    // Contract terms
    doc.setFont("helvetica", "bold");
    doc.text("Terms and Conditions:", 20, 130);
    doc.setFont("helvetica", "normal");
    doc.text(
      "1. The contractor agrees to provide the services as described below.",
      20,
      140
    );
    doc.text(
      "2. The user agrees to pay the Contractor the amount of $" +
        data.amount +
        " for the services rendered.",
      20,
      150
    );
    doc.text(
      "3. This agreement shall be governed by the laws of [State/Country].",
      20,
      160
    );

    // Signature fields
    doc.setFont("helvetica", "bold");
    doc.text(
      "IN WITNESS WHEREOF, the parties have executed this Agreement.",
      20,
      180
    );

    // Sender's signature field
    doc.text("Contractor Signature: ___________________________", 20, 200);
    doc.text(` ${data.senderName}`, 20, 210);

    // Receiver's signature field
    doc.text("User Signature: ___________________________", 20, 230);
    doc.text(` ${user.name}`, 20, 240);

    // Save the PDF
    doc.save(`contract_agreement_${data.conversationId}.pdf`);
  };

  // Scroll to the latest message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Dummy channels data
  const channe = [
    {
      _id: "1",
      name: "General",
      avatar: "https://via.placeholder.com/30",
    },
  ];
  return (
    <div>
      <Header />
      <div className="messenger mt-4">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <div className="conversationsSection">
              <h3>Conversations</h3>
              {conversations.map((c) => (
                <div
                  key={c._id}
                  onClick={() => {
                    setCurrentChat(c);
                    setSelectedConversation(c._id);
                    setSelectedChannel(null);
                  }}
                  className={
                    selectedConversation === c._id ? "selectedConversation" : ""
                  }
                >
                  <Conversation
                    conversation={c}
                    currentUser={user}
                    onlineUsers={onlineUsers}
                  />
                </div>
              ))}
            </div>

            <div className="channelsSection">
              <h3>Channels</h3>
              {channe.map((channel) => (
                <div
                  key={channel._id}
                  onClick={() => {
                    setCurrentChat(channel);
                    setSelectedChannel(channel._id);
                    setSelectedConversation(null);
                    socket.current.emit("joinChannel", channel._id);
                  }}
                  className={
                    selectedChannel === channel._id ? "selectedChannel" : ""
                  }
                >
                  <GeneralChat channel={channel} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div key={m._id} ref={scrollRef}>
                      <Message
                        conversation={currentChat}
                        message={m}
                        own={m.sender === user._id}
                        currentUserId={user._id}
                        avatar={user.avatar}
                        isChannel={!!selectedChannel}
                      />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <div className="chatInputContainer">
                    <textarea
                      className="chatMessageInput"
                      placeholder={
                        isTyping ? "Typing..." : "Write something..."
                      }
                      onChange={(e) => {
                        setNewMessage(e.target.value);
                        handleTyping();
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSubmit(e);
                        }
                      }}
                      value={newMessage}
                      rows={1}
                      onInput={(e) => {
                        e.target.style.height = "auto";
                        e.target.style.height = e.target.scrollHeight + "px";
                      }}
                    ></textarea>
                    <button
                      className="chatSubmitButton"
                      onClick={handleSubmit}
                      disabled={!newMessage.trim()}
                    >
                      <FaPaperPlane className="sendIcon" /> {/* Send icon */}
                    </button>
                    {user.role === "Contractor" && !selectedChannel && (
                      <button
                        className="sendOfferButton"
                        onClick={openOfferModal}
                      >
                        <BiDollar className="offerIcon" size={20} />
                      </button>
                    )}

                    <Modal show={showOfferModal} onHide={closeOfferModal}>
                      <Modal.Header closeButton>
                        <Modal.Title>Send Offer</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Form.Group controlId="offerAmount">
                            <Form.Label>Enter the offer amount:</Form.Label>
                            <Form.Control
                              type="number"
                              placeholder="Amount"
                              value={offerAmount}
                              onChange={(e) => setOfferAmount(e.target.value)}
                            />
                          </Form.Group>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={closeOfferModal}>
                          Cancel
                        </Button>
                        <Button variant="primary" onClick={handleSendOffer}>
                          Send Offer
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation or channel to start a chat.
              </span>
            )}
          </div>
        </div>
      </div>
      {offer && (
        <OfferPopup
          amount={offer.amount}
          onAccept={handleAcceptOffer}
          onReject={handleRejectOffer}
        />
      )}
    </div>
  );
}

export default CommunityChat;
