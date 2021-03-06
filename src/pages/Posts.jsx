import React, {useEffect, useState} from "react";
import {usePosts} from "../ hooks/usePosts";
import {useFetching} from "../ hooks/useFetching";
import PostService from "../API/PostService";
import {getPageCount} from "../utils/pages";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/MyModal/MyModal";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import PostList from "../components/PostList";
import Pagination from "../components/UI/Pagination/Pagination";
import Loader from "../components/UI/Loader/Loader";

function Posts() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page)
        setPosts(response.data)
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit))
    });

    useEffect(() => {
        fetchPosts()
    }, [page])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page)
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
            <PostFilter filter={filter} setFilter={setFilter}/>
            {postError &&
            <h1>Error ${postError}</h1>
            }
            {isPostsLoading
                ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '100px'}}><Loader/></div>
                : <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Phones List'/>
            }
            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}/>
        </div>
    );
}

export default Posts;
