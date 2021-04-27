import React, { useEffect, useState } from "react";
import "./Page.css";

import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import ReactPlayer from "react-player/lazy";
import { useHistory, useLocation } from "react-router";
import { auth } from "./firebase";
import { Button } from "@material-ui/core";
import Nav from "./Nav";
import styled from "styled-components";
import { SlideDown } from "react-slidedown";
import "react-slidedown/lib/slidedown.css";

function Page({ username }) {
    const [trailerUrl, setTrailerUrl] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [title,setTitle] = useState("");
    const history = useHistory();

    useEffect(() => {
        const proc = () => {
            const ur = new URLSearchParams(window.location.search);
            // console.log(ur.get("yid"));
            if (imageUrl && title) {
                setImageUrl("");
                setTitle("");
            } else {
                setImageUrl(ur.get("ban"));
                setTitle(ur.get("title"));
            }
        };
        return proc;
    },[]);

    const useQuery = () => {
        const ur = new URLSearchParams(window.location.search);
        // console.log(ur.get("yid"));
        if (trailerUrl) {
            setTrailerUrl("");
        } else {
            setTrailerUrl(ur.get("yid"));
        }
    };
    return (
        <>
            <Nav username={username} />

            <div className="page_body">
                <div>
                    {/* <Container imageUrl></Container> */}
                    <p id="title">{title}</p>
                    <img id="backdrop" src={imageUrl} alt=""/>
                    <img id="poster" src={imageUrl} alt=""/>
                </div>
                <div className="video_container">
                    <button
                        onClick={useQuery}
                        className="page_btn"
                        id="launch_btn"
                    >
                        LAUNCH TRAILER
                    </button>
                    {trailerUrl && (
                        <SlideDown>
                            <ReactPlayer url={trailerUrl} controls="True" />
                        </SlideDown>
                    )}
                    <button
                        className="page_btn"
                        id="back_btn"
                        onClick={() => history.push(`/${auth.currentUser.uid}`)}
                    >
                        Back
                    </button>
                </div>
            </div>
        </>
    );
}

const Container = styled.div`
    background-image: url(${(props) => props.img});
    position: absoloute;
    background-size: 300px 150px;
    background-repeat: no-repeat;
    backdrop-filter: contrast(80%);
`;

export default Page;
