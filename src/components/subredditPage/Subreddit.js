import React from 'react'
import { useHistory } from "react-router-dom";
import './Subreddit.css';

function Subreddit(props) {
    const history = useHistory();
    console.log("props>>",props, ">>>",history)
    console.log("<><><>",history.location.state.detail)
    const subRedditData = history.location.state.detail;
    return (
        <div className="posts-wrapper">
      
        <div className="post">
          <div className="post-sidebar">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
            </svg>
            <span>{subRedditData.ups}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-arrow-down downvote" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
            </svg>
          </div>
          <div className="post-title">
            {/* <img src={post.subreddit.image_src} /> */}
            {/* <span className="subreddit-name">r/{post.subreddit.name}</span> */}
            <span className="post-user">Posted by</span>
            <span className="post-user underline">u/{subRedditData.author}</span>
            <span className="post-user">{subRedditData.num_crossposts} years ago</span>
          </div>
          <div className="post-body">
            <span className="title">{subRedditData.title}</span>
            {/* {post.video_src && <Video src={post.video_src} duration={post.duration} />} */}
            {subRedditData.thumbnail && <img src={subRedditData.thumbnail} />}
            {subRedditData.selftext && <span className="description">{subRedditData.selftext}</span>}
          </div>
        </div>
    </div>
    )
}

export default Subreddit;
