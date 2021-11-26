import React from 'react';
import PostItem from "./PostItem";

const PostList = (props) => {
    if(props.posts.length === 0) {
        return <div className='entries'>No entries...</div>
    }

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>{props.title}</h1>
            {props.posts.map((post, index) =>
                <PostItem remove={props.remove} number={index} post={post} key={post.id}/>
            )}
        </div>
    );
};

export default PostList;