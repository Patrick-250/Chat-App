// src/components/Post/Post.jsx
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faShare,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import "./Post.css";

const Post = ({ user, content }) => {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [shares, setShares] = useState(0);
  const [commentInput, setCommentInput] = useState("");
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentInput.trim()) {
      setComments([...comments, commentInput]);
      setCommentInput("");
      setShowCommentBox(false);
    }
  };

  const handleShare = () => {
    setShares(shares + 1);
    setShowShareOptions(true);
  };

  const handleShareToFriend = (friend) => {
    // Add logic to share the post with the selected friend
    console.log(`Shared with ${friend}`);
    setShowShareOptions(false);
  };

  const suggestedFriends = ["Friend1", "Friend2", "Friend3"];

  return (
    <div className="post">
      <div className="post-header">
        <strong>{user}</strong>
      </div>
      <div className="post-content">
        <p>{content}</p>
      </div>
      <div className="post-actions">
        <button onClick={handleLike}>
          <FontAwesomeIcon icon={faHeart} /> Like {likes}
        </button>
        <button onClick={() => setShowCommentBox(!showCommentBox)}>
          <FontAwesomeIcon icon={faComment} /> Comment {comments.length}
        </button>
        <button onClick={handleShare}>
          <FontAwesomeIcon icon={faShare} /> Share {shares}
        </button>
      </div>
      {showCommentBox && (
        <div className="post-comments">
          {comments.map((comment, index) => (
            <div key={index} className="comment">
              {comment}
            </div>
          ))}
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <input
              type="text"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Add a comment..."
            />
            <button type="submit">
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </form>
        </div>
      )}
      {showShareOptions && (
        <div className="share-options">
          <h4>Share with:</h4>
          <ul>
            {suggestedFriends.map((friend, index) => (
              <li key={index} onClick={() => handleShareToFriend(friend)}>
                {friend}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Post;
