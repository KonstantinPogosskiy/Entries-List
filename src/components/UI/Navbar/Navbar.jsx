import React from 'react';
import {Link} from "react-router-dom";
import MyButton from "../button/MyButton";

const Navbar = () => {
    return (
        <div className="navbar">
            <MyButton>
                Exit
            </MyButton>
            <div className="navbar__links">
                <Link to="/about">About us</Link>
                <Link to="/posts">Posts</Link>
            </div>
        </div>
    );
};

export default Navbar;