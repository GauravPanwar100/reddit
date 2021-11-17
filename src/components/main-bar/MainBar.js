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
    const [loading, setLoading] = useState(false);
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
            setLoading(true);
        } else if (page === 'new') {
            let url = 'https://www.reddit.com/r/gifs/new.json?limit=' + initialLimit;
            url = url + (after !== '' ? `&&after=${after}` : '');
            console.log(url)
            res = await axios.get(url);
            setActiveTab('new');
            setLoading(true);
        } else if (page === 'top') {
            let url = `https://www.reddit.com/r/gifs/top.json?limit=${initialLimit}`;
            url = url + (after !== '' ? `&&after=${after}` : '');
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
                setposts(res.data.data.children)
            }, 1000);
            

            if (activeTab === 'hot') {

            }
            setAfter(res.data.data.after);
        }
        console.log("res>>",res,"afetr",after)
    }

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

      <Posts posts={posts} loading={loading} /*fetchMoreData={fetchMoreData()}*/ hasMore={hasMore} fetchPost={fetchPost} initialLimit={() => setInitialLimit(initialLimit + 10)}/>
      {/* <Demo /> */}
    </div>
  );
}