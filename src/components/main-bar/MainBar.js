import React, { useState, useEffect } from "react";
import axios from 'axios';

import CloseIcon from "@material-ui/icons/Close";
import Whatshot from "@material-ui/icons/Whatshot";
import NewReleases from "@material-ui/icons/NewReleases";
import TrendingUp from "@material-ui/icons/TrendingUp";
import Menu from "@material-ui/icons/Menu";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";

import "./MainBar.css";
import Posts from "../posts/Posts";
import Demo from "../../Demo";
import Pagination from "../pagination/Pagination";
import { postDataAction } from '../../redux/actions/postDataAction';
import { useDispatch } from 'react-redux';

export default function MainBar() {
    const [posts, setposts] = useState([]);
    const [initialLimit, setInitialLimit] = useState(30);
    const [loading, setLoading] = useState(false);
    const [after, setAfter] = useState('');
    const [activeTab, setActiveTab] = useState('hot');
    const [hasMore, setHasMore] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);

    //   redux
    const dispatch = useDispatch();

    useEffect(() => {
        fetchPost();
    }, []);

    const fetchPost = async (page) => {
        let res;
        if (page === 'hot') {
            let url = `https://www.reddit.com/r/gifs/hot.json?limit=${initialLimit}`;
            // url = url + (after !== '' ? `&&after=${after}` : '');
            res = await axios.get(url);
            setActiveTab('hot');
            setLoading(true);
        } else if (page === 'new') {
            let url = 'https://www.reddit.com/r/gifs/new.json?limit=' + initialLimit;
            // url = url + (after !== '' ? `&&after=${after}` : '');
            console.log(url)
            res = await axios.get(url);
            setActiveTab('new');
            setLoading(true);
        } else if (page === 'top') {
            let url = `https://www.reddit.com/r/gifs/top.json?limit=${initialLimit}`;
            // url = url + (after !== '' ? `&&after=${after}` : '');
            res = await axios.get(url);
            setActiveTab('top');
            setLoading(true);
        } else {
            res = await axios.get(`https://www.reddit.com/r/gifs.json?limit=${initialLimit}`);
            setActiveTab('hot');
            setLoading(true);
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

    }

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // Change Page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
      <>
    <div className="main-bar">
      <div className="filter-container">
        <div className={activeTab === 'hot' ? "filter-element hoverable": "filter-element-secondary hoverable"} onClick={() => fetchPost('hot')}>
          <Whatshot />
          <span>Hot</span>
        </div>
        {/* <div className="filter-element hoverable">
          <span>Everywhere</span>
          <ArrowDropDown />
        </div> */}
        <div className={activeTab === 'new' ? "filter-element hoverable": "filter-element-secondary hoverable"} onClick={() => fetchPost('new')}>
          <NewReleases />
          <span>New</span>
        </div>
        <div className={activeTab === 'top' ? "filter-element hoverable": "filter-element-secondary hoverable"} onClick={() => fetchPost('top')}>
          <TrendingUp />
          <span>Top</span>
        </div>
        <MoreHoriz className="filter-element-tertiary hoverable" />
        <div className="spacer"></div>
        <div className="filter-element-menu hoverable">
          <Menu />
          <ArrowDropDown />
        </div>
      </div>

      <Posts posts={currentPosts} loading={loading} /*fetchMoreData={fetchMoreData()}*/ hasMore={hasMore} fetchPost={fetchPost} initialLimit={() => setInitialLimit(initialLimit + 10)}/>
      {/* <Demo /> */}
      {!loading && <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} currentPage={currentPage} />}
    </div>
    
    </>
  );
}