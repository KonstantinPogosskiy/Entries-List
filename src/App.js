import React, {useEffect, useState} from 'react';
import '../src/styles/App.css';
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import {usePosts} from "./ hooks/usePosts";
import * as axios from 'axios';
import PostService from "./API/PostService";

function App() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const [isPostsLoading, setIsPostsLoading] = useState(false)

    useEffect(() => {
        fetchPosts()
    }, [])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }
    async function fetchPosts() {
        setIsPostsLoading(true)
        const posts = await PostService.getAll()
        setPosts(posts)
        setIsPostsLoading(false)
    }
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    return (
        <div className="App">
            <MyButton
                onClick={() => setModal(true)}
                style={{marginTop: 30}}
            >
                Create entry
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
            <PostForm create={createPost}/>
            </MyModal>
            <PostFilter filter={filter} setFilter={setFilter} />
            {isPostsLoading
                ? <h1>loading in progress...</h1>
                : <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Phones List'/>
            }
        </div>
    );
}

export default App;
