import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import Posts from "../posts/Posts";
import Pagination from "../pagination/Pagination";
import { postDataAction } from '../../redux/actions/postDataAction';
import "./Goal.css";
import MainBar from "../main-bar/MainBar";

export default function Goal() {
  const [posts, setposts] = useState([]);
  const [initialLimit, setInitialLimit] = useState(30);
  const [loading, setLoading] = useState(false);
  const [after, setAfter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [activeTab, setActiveTab] = useState('hot');
  const [hasMore, setHasMore] = useState(true);

  //   redux
  const dispatch = useDispatch();

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async (page) => {
    let res;
    setLoading(true);
    setCurrentPage(1);
    if (page === "hot") {
      let url = `https://www.reddit.com/r/gifs/hot.json?limit=${initialLimit}`;
      // url = url + (after !== '' ? `&&after=${after}` : '');
      res = await axios.get(url);
      setActiveTab("hot");
    } else if (page === "new") {
      let url = "https://www.reddit.com/r/gifs/new.json?limit=" + initialLimit;
      // url = url + (after !== '' ? `&&after=${after}` : '');
      // console.log(url)
      res = await axios.get(url);
      setActiveTab("new");
    } else if (page === "top") {
      let url = `https://www.reddit.com/r/gifs/top.json?limit=${initialLimit}`;
      // url = url + (after !== '' ? `&&after=${after}` : '');
      res = await axios.get(url);
      setActiveTab("top");
    } else {
      res = await axios.get(
        `https://www.reddit.com/r/gifs.json?limit=${initialLimit}`
      );
      setActiveTab("hot");
    }

    if (res && res.status === 200) {
      // setTotalPosts(res.data.data.children);

      setTimeout(() => {
        setLoading(false);
        setposts(res.data.data.children);
      }, 1000);

      dispatch(postDataAction(res.data.data.children));

      setAfter(res.data.data.after);
    }
  };

  // Get Posts from redux store
  const postsList = useSelector((state) => state.postDataReducer.postData);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const currentPosts = postsList.slice(indexOfFirstPost, indexOfLastPost);
  
  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <div className="content">
      {/* <TrendingToday /> */}
      <div className="bars-wrapper">
        <span className="popular-posts-title">Popular posts</span>
        <div className="bars-wrapper-inside">
          <MainBar fetchPost={fetchPost} activeTab={activeTab}/>
          {/* <SideBar /> */}
          <Posts
            posts={currentPosts}
            loading={loading}
            /*fetchMoreData={fetchMoreData()}*/ 
            hasMore={hasMore}
            fetchPost={fetchPost}
            initialLimit={() => setInitialLimit(initialLimit + 10)}
          />

          {!loading && (
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={posts.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
}
