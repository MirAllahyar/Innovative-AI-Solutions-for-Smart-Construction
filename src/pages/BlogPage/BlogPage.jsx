import React, { useState } from 'react';
import './BlogPage.css';
import blogImage1 from '../../assets/images/blog1.jpg';
import blogImage2 from '../../assets/images/blog2.jpg';
import blogImage3 from '../../assets/images/blog3.jpg'; // Make sure this exists
import Header from '../../components/Header/Header'; // Import Header component
import Footer from '../../components/Footer/Footer'; // Import Footer component

const BlogPage = () => {
  const [expandedPosts, setExpandedPosts] = useState({}); // Track which posts are expanded

  const togglePost = (index) => {
    setExpandedPosts({
      ...expandedPosts,
      [index]: !expandedPosts[index], // Toggle the post content
    });
  };

  const blogPosts = [
    {
      image: blogImage1,
      title: 'Latest Trends in Smart Construction',
      shortContent: 'Discover the most recent advancements and innovations...',
      fullContent: 'Full content for "Latest Trends in Smart Construction". Here you can expand the description and provide more information to the user. This content should give more insights about smart construction trends, AI integration, and future tech.',
    },
    {
      image: blogImage2,
      title: 'Why AI is Important in Real Estate',
      shortContent: 'Learn how Artificial Intelligence is reshaping real estate...',
      fullContent: 'Full content for "Why AI is Important in Real Estate". Discuss how AI is revolutionizing the real estate industry by automating tasks, improving property analysis, and making data-driven decisions.',
    },
    {
      image: blogImage3,
      title: 'Construction Management Tools',
      shortContent: 'Explore the various construction management tools using AI...',
      fullContent: 'Full content for "Construction Management Tools". Explore in-depth information about the tools that construction managers can use to streamline operations, improve safety, and optimize project delivery timelines.',
    },
  ];

  return (
    <>
      <Header /> {/* Add the header */}

      <div className="blog-page">
        <header className="blog-header">
          <h1>Our Blog</h1>
          <p>Discover insights, trends, and stories from the world of smart construction.</p>
        </header>

        <div className="blog-content">
          {blogPosts.map((post, index) => (
            <div className="blog-post" key={index}>
              <img src={post.image} alt={post.title} className="blog-post-image" />
              <h2>{post.title}</h2>
              <p>
                {expandedPosts[index] ? post.fullContent : post.shortContent}
              </p>
              <button
                className="read-more-btn"
                onClick={() => togglePost(index)}
              >
                {expandedPosts[index] ? 'Read Less' : 'Read More'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <Footer /> {/* Add the footer */}
    </>
  );
};

export default BlogPage;
