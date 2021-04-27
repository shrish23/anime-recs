import { Button } from "@material-ui/core";
import "./Page.css";
import React, { Suspense, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { auth } from "./firebase";
import movieTrailer from "movie-trailer";
import Nav from "./Nav";
import { useHistory } from "react-router";
import styled from "styled-components";
import $, { get } from "jquery";
import { SlideDown } from "react-slidedown";
import "react-slidedown/lib/slidedown.css";

function Pages({ username }) {
    const [loaded, setLoaded] = useState(false);
    // const [malId, setMalId] = useState("");
    // USE malId TO ACCESS THE ID OF THE ANIME WHICH WILL BE AVILABLE AFTER CLICKING THE BUTTON. THE ID IS IN STRING SO IF YOU WANT YOU CAN CONVERT IT
    const [imageUrl, setImageUrl] = useState("");
    const [animes, CurrentAnime] = useState({});
    const [trailer, setTrailer] = useState("");

    const history = useHistory();
    const getUrlVars = function () {
        var vars = [],
            hash;
        var hashes = window.location.href
            .slice(window.location.href.indexOf("?") + 1)
            .split("&");
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split("=");
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    };

    var mal_id = getUrlVars()["id"];
    // console.log(mal_id);
    // var loaded = false;
    useEffect(() => {
        const getan =  () => {
            // var poster_container_div = "";

            $(async function () {
                console.log(loaded);
                if (loaded === false) {
                   await $.ajax({
                        dataType: "json",
                        url: `https://api.jikan.moe/v4/anime/${mal_id}`,
                        method: "get",
                        success: function (response) {
                            CurrentAnime(response.data);
                            setImageUrl(response.data.images.jpg.large_image_url);
                            setTrailer(response.data.trailer.embed_url)
                            setLoaded(true);
                            console.log(loaded);
                            //     poster_container_div = `<img id="backdrop" src="${response.data.images.jpg.large_image_url}" />
                            // <img id="poster" src="${response.data.images.jpg.large_image_url}" />`;
                            //     $("#poster_container").html(poster_container_div);

                            console.log(animes);
                            console.log(response.data.images);
                        },
                    });
                }
            });
        };
        getan();

        // const proc = () => {
        //     const ur = new URLSearchParams(window.location.search);
        //     // console.log(ur.get("id"));
        //     if (imageUrl) {
        //         setImageUrl("");
        //         setMalId("");
        //     } else {
        //         setImageUrl(ur.get("ban"));
        //         setMalId(ur.get("id"));
        //     }
        //     // console.log(malId);
        // };
        // return proc;
    });

    return (
        <>
            <Nav username={username} />
            <div className="page_body">
                
                {animes ? (
                    <div id="poster_container">
                        <p id="title">{animes.title}</p>
                        <Suspense fallback={<h1>LOADING....</h1>}>
                        <img
                            id="backdrop"
                            src={`${imageUrl}`}
                            alt=""
                        />
                        </Suspense>
                        <img
                            id="poster"
                            src={`${imageUrl}`}
                            alt=""
                        />
                        
                    </div>
                ):"LOADING"}
                
                
                <div className="video_container">
                    <button className="page_btn" id="launch_btn">
                        LAUNCH TRAILER
                    </button>
                    <SlideDown>
                        <ReactPlayer
                            url={trailer}
                            controls="True"
                        />
                    </SlideDown>
                    <div>{/* Code for video such */}</div>
                    <button
                        // onClick={useQuery}
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


export default Pages;
