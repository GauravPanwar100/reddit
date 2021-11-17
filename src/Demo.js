import React, { Component } from 'react'
import Posts from './components/posts/Posts';
import axios from 'axios'

export class Demo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height: window.innerHeight,
            message: 'not at bottom',
            hasMore: true,
            posts: [],
            initialLimit: 10
        };
        this.handleScroll = this.handleScroll.bind(this);
    }
    handleScroll() {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight) {console.log("ifff")
        this.setState({ initialLimit: this.state.initialLimit + 10 });
        this.fetchPost();
            
        }
    }
    
    componentDidMount() {
        this.fetchPost();
        window.addEventListener("scroll", this.handleScroll);
    }
    
    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    fetchPost = async (page) => {
        let res;
        if (page === 'hot') {
            res = await axios.get(`https://www.reddit.com/r/gifs/hot.json?limit=${this.state.initialLimit}`);
            // setActiveTab('hot');
        } else if (page === 'new') {
            res = await axios.get(`https://www.reddit.com/r/gifs/new.json?limit=${this.state.initialLimit}`);
            // setActiveTab('new');
        } else if (page === 'top') {
            res = await axios.get(`https://www.reddit.com/r/gifs/top.json?limit=${this.state.initialLimit}`);
            // setActiveTab('top');
        } else {
            res = await axios.get(`https://www.reddit.com/r/gifs.json?limit=${this.state.initialLimit}`);
            // setActiveTab('hot');
            
        }

        if (res && res.status === 200) {
            // setTotalPosts(res.data.data.children);
            // setposts(res.data.data.children);
            this.setState({ posts: res.data.data.children})
        }
        console.log("res>>",res)
    }

    fetchMoreData = () => {
        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        console.log("gggg",this.state.posts.length)
        if (this.state.posts.length > 100) {
            // setHasMore(false);
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

    render() {
        return (
            <div>
                <Posts posts={this.state.posts} fetchMoreData={this.fetchMoreData} hasMore={this.state.hasMore} initialLimit={this.state.initialLimit + 10}/>
            </div>
        )
    }
}

export default Demo
