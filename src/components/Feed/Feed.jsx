// src/components/Feed/Feed.jsx
import React from "react";
import "./Feed.css";
import Post from "../Post/Post";

const Feed = () => {
  const friendPosts = [
    { id: 1, user: "Friend1", content: "This is a post by Friend1" },
    { id: 2, user: "Friend2", content: "This is a post by Friend2" },
  ];

  const popularPosts = [
    {
      id: 3,
      user: "PopularUser1",
      content: "This is a popular post by PopularUser1",
    },
    {
      id: 4,
      user: "PopularUser2",
      content: "This is a popular post by PopularUser2",
    },
  ];

  const newsPosts = [
    {
      id: 5,
      user: "NewsSource1",
      content: "This is a news post by NewsSource1",
    },
    {
      id: 6,
      user: "NewsSource2",
      content: "This is a news post by NewsSource2",
    },
  ];

  // Combine all posts into a single array
  const allPosts = [...friendPosts, ...popularPosts, ...newsPosts];

  // Shuffle the array to randomize the order
  const shuffledPosts = allPosts.sort(() => Math.random() - 0.5);

  return (
    <div className="feed">
      {shuffledPosts.map((post) => (
        <Post key={post.id} user={post.user} content={post.content} />
      ))}
    </div>
  );
};

export default Feed;
