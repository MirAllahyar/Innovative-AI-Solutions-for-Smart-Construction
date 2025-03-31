import { Bid } from "../models/bid.model.js";
import { User } from "../models/user.model.js";
import { sendBiddingEmail } from "../utils/sendEmail.js";

// Create a Bid
export const createBid = async (req, res) => {
  try {
    const { title, description, budget, date, location } = req.body;
    const { userId } = req.user;
    const validUser = await User.findOne({ _id: userId, role: "User" });

    if (!title || !description || !budget || !date || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!validUser) {
      return res.status(401).json({ message: "Only User can create Bid" });
    }
    const newBid = new Bid({
      title,
      description,
      budget,
      date,
      location,
      user: userId,
    });

    await newBid.save();
    res.status(201).json({ message: "Bid created successfully", bid: newBid });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBids = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const bids = await Bid.find({ date: { $gte: new Date() } })
      .populate("user", "name email avatar")
      .sort({ budget: 1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalBids = await Bid.countDocuments();
    res.status(200).json({
      bids,
      currentPage: Number(page),
      limit: Number(limit),
      totalBids,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserBids = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const { userId } = req.user;

    const bids = await Bid.find({ user: userId })
      .sort({ budget: 1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const totalBids = await Bid.countDocuments({ userId });

    res.status(200).json({
      bids,
      currentPage: Number(page),
      limit: Number(limit),
      totalBids,
      totalPages: Math.ceil(totalBids / limit), // Calculate total pages
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteBidById = async (req, res) => {
  try {
    const { id } = req.params;
    const bid = await Bid.findById(id);
    if (!bid) {
      return res.status(404).json({ message: "Bid not found" });
    }

    await Bid.findByIdAndDelete(id);
    res.status(200).json({ message: "Bid deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteExpiredBids = async (req, res) => {
  try {
    const bids = await Bid.find({ date: { $lt: new Date() } });
    if (!bids.length) {
      return res.status(404).json({ message: "No expired bids found" });
    }
    await Bid.deleteMany({ date: { $lt: new Date() } });
    res.status(200).json({ message: "Expired bids deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const placeBid = async (req, res) => {
  try {
    const {
      userName,
      userEmail,
      bidId,
      amount,
      message,
      bidderName,
      bidderEmail,
    } = req.body;
    console.log(
      userName,
      userEmail,
      bidId,
      amount,
      message,
      bidderName,
      bidderEmail
    );
    const bid = await Bid.findById(bidId);
    if (!bid) {
      return res.status(404).json({ message: "Bid not found" });
    }
    bid.currentBid = amount;
    await bid.save();
    sendBiddingEmail(
      userName,
      userEmail,
      message,
      amount,
      bid.title,
      bidderName,
      bidderEmail
    );
    res.status(200).json({
      message: "Bid placed successfully",
      newBid: {
        amount: bid.currentBid,
        jobId: bid._id,
      },
    });
  } catch (error) {}
};

export const getBidById = async (req, res) => {
  try {
    const { id } = req.params;
    const bid = await Bid.findById(id).populate(
      "user",
      "_id name email avatar"
    );
    if (!bid) {
      return res.status(404).json({ message: "Bid not found" });
    }
    res.status(200).json(bid);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
