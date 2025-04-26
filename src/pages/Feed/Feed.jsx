import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Feed.css"; // Import the CSS file
import { backend_url } from "../../server";
import { format } from "timeago.js";
import Header from "../../components/Header/Header";
import { useUser } from "../../context/UserContext";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Feed = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Track if there are more posts to load
  const [newPost, setNewPost] = useState({
    title: "",
    image: null,
    imagePreview: null, // To show the image preview
  });

  // Fetch posts when the page changes
  useEffect(() => {
    if (hasMore) {
      fetchPosts();
    }
  }, [page]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${backend_url}/posts?page=${page}&limit=5`
      );
      const newPosts = response.data.map((post) => ({
        ...post,
        showComments: false, // Add a flag to control comment visibility
      }));

      // If no new posts are returned, there are no more posts to load
      if (newPosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    setLoading(false);
  };

  // Handle scroll event for infinite loading
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 && // Load more posts when 100px from the bottom
      !loading &&
      hasMore
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  // Handle liking a post
  const handleLike = async (postId) => {
    try {
      await axios.post(`${backend_url}/posts/${postId}/like`);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId ? { ...post, likes: post.likes + 1 } : post
        )
      );
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  // Toggle comments visibility for a post
  const toggleComments = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? { ...post, showComments: !post.showComments }
          : post
      )
    );
  };

  // Handle adding a comment to a post
  const handleAddComment = async (e, postId) => {
    if (!user) {
      toast.error("You must be logged in to comment!");
      navigate("/login");
      return;
    }
    e.preventDefault();
    const commentText = e.target.commentInput.value;

    try {
      const response = await axios.post(
        `${backend_url}/posts/${postId}/comments`,
        {
          text: commentText,
        },
        {
          withCredentials: true,
        }
      );

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                comments: [...post.comments, response.data],
              }
            : post
        )
      );

      e.target.commentInput.value = ""; // Clear the input field
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  // Handle creating a new post
  const handleCreatePost = async (e) => {
    if (!user) {
      toast.error("You must be logged in to create a post!");
      navigate("/login");
      return;
    }
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", newPost.title);

    if (newPost.image) {
      formData.append("image", newPost.image);
    }

    try {
      const response = await axios.post(`${backend_url}/posts`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setPosts((prevPosts) => [
        { ...response.data, showComments: false },
        ...prevPosts,
      ]);
      setNewPost({ title: "", image: null, imagePreview: null }); // Reset the form
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPost({
          ...newPost,
          image: file,
          imagePreview: reader.result, // Set the image preview URL
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Header />
      <div className="feed-wrapper mt-5">
        <div className="create-post-container">
          <div className="create-post-header">
            <img
              src={
                user
                  ? `http://localhost:5000${user.avatar}`
                  : "https://t4.ftcdn.net/jpg/03/49/49/79/360_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
              }
              alt="Profile"
              className="profile-pic"
            />
            <input
              type="text"
              placeholder="Title"
              value={newPost.title}
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
              className="post-input"
            />
          </div>
          {newPost.imagePreview && (
            <div className="image-preview">
              <img
                src={newPost.imagePreview}
                alt="Preview"
                className="preview-image"
              />
            </div>
          )}
          <div className="create-post-footer">
            <label className="photo-upload">
              <input type="file" onChange={handleImageChange} hidden />
              <span>Photo</span>
            </label>
            <button onClick={handleCreatePost} className="post-button">
              Post
            </button>
          </div>
        </div>

        {posts.map((post) => (
          <div key={post._id} className="post-container">
            <div className="post-header">
              <img
                src={`http://localhost:5000${post.user.avatar}`}
                alt="Profile"
                className="profile-pic"
              />
              <div className="post-meta">
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/user/${post?.user?._id}`}
                >
                  <span className="post-author">{post.user.name}</span>
                </Link>
                <span className="post-time"> {format(post.createdAt)} </span>
              </div>
            </div>
            <div className="post-content">
              <p>{post.title}</p>
              {post.image && (
                <img
                  src={`http://localhost:5000/${post.image}`}
                  alt="Post"
                  className="post-image"
                />
              )}
            </div>
            <div className="post-stats">
              <span>{post.likes} Likes</span>
              <span>{post.comments.length} Comments</span>
            </div>
            <div className="post-actions">
              <button
                onClick={() => handleLike(post._id)}
                className="action-btn"
              >
                Like
              </button>
              <button
                onClick={() => toggleComments(post._id)}
                className="action-btn"
              >
                Comment
              </button>
            </div>
            {post.showComments && (
              <div className="comments-container">
                {post.comments.map((comment) => (
                  <div key={comment._id} className="comment-item">
                    <img
                      src={`http://localhost:5000${comment.user.avatar}`}
                      alt="Profile"
                      className="comment-profile-pic"
                    />
                    <div className="comment-content">
                      <span className="comment-author">
                        <Link
                          style={{ textDecoration: "none" }}
                          to={`/user/${comment?.user?._id}`}
                        >
                          <span className="post-author">
                            {" "}
                            {comment.user.name}
                          </span>
                        </Link>
                      </span>{" "}
                      <span className="post-time">
                        {" "}
                        {format(comment.createdAt)}{" "}
                      </span>
                      <p>{comment.text}</p>
                    </div>
                  </div>
                ))}
                <form
                  className="comment-form"
                  onSubmit={(e) => handleAddComment(e, post._id)}
                >
                  <img
                    src={
                      user
                        ? `http://localhost:5000${user.avatar}`
                        : "https://t4.ftcdn.net/jpg/03/49/49/79/360_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
                    }
                    alt="Profile"
                    className="profile-pic"
                  />
                  <input
                    type="text"
                    name="commentInput"
                    placeholder="Write a comment..."
                    className="comment-input"
                  />
                </form>
              </div>
            )}
          </div>
        ))}
        {loading && <div className="loading">Loading...</div>}
        {!hasMore && <div className="loading">No more posts to load</div>}
      </div>
    </>
  );
};

export default Feed;
