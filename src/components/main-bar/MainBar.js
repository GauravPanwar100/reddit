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

export default function MainBar() {
    const [posts, setposts] = useState([]);
    const [initialLimit, setInitialLimit] = useState(10);
    const [after, setAfter] = useState('');
    const [activeTab, setActiveTab] = useState('hot');
    const [totalPosts, setTotalPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        fetchPost();
    }, []);

    const fetchPost = async (page) => {
        let res;
        if (page === 'hot') {
            let url = `https://www.reddit.com/r/gifs/hot.json?limit=${initialLimit}`;
            url = url + (after !== '' ? `&&after=${after}` : '');
            res = await axios.get(url);
            setActiveTab('hot');
        } else if (page === 'new') {
            let url = 'https://www.reddit.com/r/gifs/new.json?limit=' + initialLimit;
            url = url + (after !== '' ? `&&after=${after}` : '');
            console.log(url)
            res = await axios.get(url);
            setActiveTab('new');
        } else if (page === 'top') {
            let url = `https://www.reddit.com/r/gifs/top.json?limit=${initialLimit}`;
            url = url + (after !== '' ? `&&after=${after}` : '');
            res = await axios.get(url);
            setActiveTab('top');
        } else {
            res = await axios.get(`https://www.reddit.com/r/gifs.json?limit=${initialLimit}`);
            setActiveTab('hot');
        }

        if (res && res.status === 200) {
            // setTotalPosts(res.data.data.children);
            setposts(res.data.data.children);
            setAfter(res.data.data.after);
        }
        console.log("res>>",res,"afetr",after)
    }

    const fetchMoreData = () => {
        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        console.log("gggg",posts.length)
        if (posts.length > 100) {
            setHasMore(false);
            return;
        }
        // setInitialLimit(initialLimit + 10);
        // fetchPost(activeTab);
        // let postBreak = [];
        // postBreak.push(posts.slice(0,10))
        // setTimeout(() => {
        //     if (posts.length <= totalPosts.length) {
        //         setposts(posts.concat(totalPosts.slice(totalPosts.length-posts.length, 10)));
        //         setHasMore(true);
        //         return;
        //     }
        //     setHasMore(false);
        // }, 1500);
    };
//     useEffect(() => {
//         var wrapper = document.getElementById('scrollableDiv');

// window.onscroll = function (evt) {
//   if ((window.scrollTop + window.innerHeight) >= window.scrollHeight) {
//     alert("jjjj")
//   }
// }
//     }, []);
    

  return (
    <div className="main-bar">
      {/* <div className="update-card">
        <div className="top-section">
          <span>UPDATES FROM REDDIT</span>
          <CloseIcon className="hoverable" />
        </div>
        <div className="body hoverable">
          <div className="context">
            <span className="title">Keep yourself safe and informed</span>
            <br />
            <span className="description">Visit r/Coronavirus to talk about COVID-19, and visit www.who.int for more information.</span>
          </div>
          <img src="./assets/images/pin.jpg" />
        </div>
      </div> */}

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

      <Posts posts={posts} fetchMoreData={fetchMoreData()} hasMore={hasMore} fetchPost={fetchPost} initialLimit={() => setInitialLimit(initialLimit + 10)}/>
      {/* <Demo /> */}
    </div>
  );
}