import { Avatar, IconButton, Menu, MenuItem } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectUser } from "./features/userSlice";
import { auth } from "./firebase";
import "./Nav.css";

function Nav({ username }) {
    const [show, handleShow] = useState(null);
    const user = useSelector(selectUser);
    const history = useHistory();

    const handleClick = (event) => {
        handleShow(event.currentTarget);
    };

    const handleClose = () => {
        handleShow(null);
    };

    return (
        <div className="nav">
            <div className="nav_contents">
                <img
                    onClick={() => history.push(`/${user.uid}`)}
                    className="nav_logo"
                    src="https://img.pngio.com/free-anime-logo-maker-anime-logo-designs-creator-anime-logo-anime-logo-png-1000_1000.png"
                    alt=""
                />
                <div className="nav_avatar">
                    <IconButton onClick={handleClick}>
                        <Avatar
                            src={auth.currentUser ? auth.currentUser.photoURL : ""}
                            alt="https://img.pngio.com/free-anime-logo-maker-anime-logo-designs-creator-anime-logo-anime-logo-png-1000_1000.png"
                        />
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={show}
                        open={Boolean(show)}
                        onClose={handleClose}
                    >
                        <MenuItem className="menu_btn">WELCOME {user.usname} </MenuItem>
                        <MenuItem
                            onClick={() => history.push(`/profile/${user.uid}`)}
                            className="menu_btn"
                        >
                            My account
                        </MenuItem>
                        <MenuItem
                            onClick={() =>
                                auth
                                    .signOut()
                                    .then(() => history.push("/login"))
                            }
                            className="menu_btn"
                        >
                            Logout
                        </MenuItem>
                    </Menu>
                </div>
            </div>
        </div>
    );
}

export default Nav;
