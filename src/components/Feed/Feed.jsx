// src/components/Feed/Feed.jsx
import React, { useState, useEffect } from "react";
import { FaThumbsUp, FaComment, FaShare } from "react-icons/fa";
import { Tooltip } from "@mui/material";
import "./Feed.css";

const Feed = () => {
  const friendPosts = [
    {
      id: 1,
      user: "Alice",
      content:
        "Had a great time hiking today! The view from the top was amazing.",
      image: "/Images/Hiking.jpg",
      profilePic: "/Images/Alice.jpg",
    },
    {
      id: 2,
      user: "Bob",
      content:
        "Just finished reading 'To Kill a Mockingbird'. What a fantastic book!",
      image: "/Images/book.jpg",
      profilePic: "/Images/Bob.jpg",
    },
  ];

  const popularPosts = [
    {
      id: 3,
      user: "NBA",
      content:
        "Catch the highlights of last night's thrilling game between the Lakers and the Warriors!",
      image: "/Images/nba.jpg",
      profilePic: "/Images/NBA.jpg",
    },
    {
      id: 4,
      user: "NFL",
      content:
        "Top plays from Week 5! Don't miss the incredible touchdown by the Chiefs.",
      image: "/Images/nfl.jpg",
      profilePic: "/Images/NFL.jpg",
    },
  ];

  const newsPosts = [
    {
      id: 5,
      user: "CNN",
      content:
        "Breaking News: Major advancements in renewable energy technology announced today.",
      image: "/Images/renewable.jpg",
      profilePic: "/Images/CNN.jpg",
    },
    {
      id: 6,
      user: "BBC",
      content:
        "Global News: Leaders gather for the climate summit to discuss urgent environmental issues.",
      image: "/Images/climate.jpg",
      profilePic: "/Images/BBC.jpg",
    },
  ];

  // Combine all posts into a single array
  const allPosts = [...friendPosts, ...popularPosts, ...newsPosts];

  // Shuffle the array to randomize the order
  const shuffledPosts = allPosts.sort(() => Math.random() - 0.5);

  useEffect(() => {
    console.log("Shuffled Posts:", shuffledPosts);
  }, [shuffledPosts]);

  return (
    <div className="feed">
      {shuffledPosts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

const Post = ({ post }) => {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleComment = () => {
    setShowCommentBox(!showCommentBox);
  };

  const handleShare = () => {
    setShowShareOptions(!showShareOptions);
  };

  return (
    <div className="post">
      <div className="post-header">
        <img src={post.profilePic} alt={post.user} />
        <h3>{post.user}</h3>
      </div>
      <p>{post.content}</p>
      <img src={post.image} alt={post.content} />
      <div className="post-actions">
        <Tooltip title="Like">
          <div onClick={handleLike}>
            <FaThumbsUp /> {likes > 0 && likes}
          </div>
        </Tooltip>
        <Tooltip title="Comment">
          <div onClick={handleComment}>
            <FaComment /> {comments > 0 && comments}
          </div>
        </Tooltip>
        <Tooltip title="Share">
          <div onClick={handleShare}>
            <FaShare />
          </div>
        </Tooltip>
      </div>
      {showCommentBox && (
        <div className="comment-box">
          <textarea placeholder="Write a comment..."></textarea>
          <button onClick={() => setComments(comments + 1)}>comment</button>
        </div>
      )}
      {showShareOptions && (
        <div className="share-options">
          <p>Share with:</p>
          <ul>
            <li>Alice</li>
            <li>Bob</li>
            <li>Charlie</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Feed;
