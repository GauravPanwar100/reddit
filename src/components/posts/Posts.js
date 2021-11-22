import React, { useEffect } from "react";
import { Link, useNavigate, useHistory } from "react-router-dom";

import "./Posts.css";


export default function Posts({ posts, loading, fetchMoreData, hasMore, fetchPost, initialLimit }) {

    const history = useHistory();

    const handleClick = (e, postData) => {

        history.push(`/subreddit${postData.data.permalink}`, {detail: postData.data})
    }

  return (
    <div className="posts-wrapper" id="scrollableDiv">
        {loading && <h4>Loading....</h4>}
      {!loading && posts && posts.map((post, index) => (
          <>
        <div className="post" key={index}>
          <div className="post-sidebar">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
            </svg>
            <span>{post.data.ups}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-arrow-down downvote" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
            </svg>
          </div>
          <div className="post-title">
            <span className="post-user">Posted by</span>
            <span className="post-user underline">u/{post.data.author}</span>
            <span className="post-user">{post.data.num_crossposts} years ago</span>
            <div className="spacer"></div>
          </div>
          <div className="post-body">
            <span className="title" onClick={(e) => handleClick(e, post)}>{post.data.title}</span>
            {post.image_src && <img src={post.image_src} />}
            {post.description && <span className="description">{post.description}</span>}
          </div>
          <div className="post-footer">
            <div className="comments footer-action">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-square" viewBox="0 0 16 16">
                <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
            </svg>
              <span>{post.data.num_comments} Comments</span>
            </div>
            <div className="share footer-action">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-share-fill" viewBox="0 0 16 16">
                <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"/>
            </svg>
              <span>Share</span>
            </div>
            <div className="save footer-action">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark" viewBox="0 0 16 16">
                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
            </svg>
              <span>Save</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
            </svg>
          </div>
        </div>
        </>
      ))}
      {!loading && posts.length === 0 && <h4>No Post Found</h4>}
    </div>
  );
}