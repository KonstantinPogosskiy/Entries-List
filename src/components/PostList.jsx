import React from 'react';
import PostItem from "./PostItem";
import TransitionGroup from "react-transition-group/cjs/TransitionGroup";
import CSSTransition from "react-transition-group/cjs/CSSTransition";

const PostList = (props) => {
    if(!props.posts.length) {
        return <div className='entries'>No entries...</div>
    }

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>{props.title}</h1>
            <TransitionGroup>
            {props.posts.map((post, index) =>
                <CSSTransition
                    key={post.id}
                    timeout={500}
                    classNames="post"
                >
                <PostItem remove={props.remove} number={index} post={post} />
                </CSSTransition>
            )}
            </TransitionGroup>
        </div>
    );
};

export default PostList;