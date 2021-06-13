import { Button } from "@material-ui/core";
import TodayIcon from "@material-ui/icons/Today";
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
    // const [month_from, setMonthFrom] = useState("");
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

    // var date = null;
    const [date,setDate] = useState("");
    const [date_to,setDateTo] = useState("");
    const [air,setAir] = useState({});

    // var month = null;
    // var month_to = null;
    const [month,setMonth] = useState("");
    const [month_to,setMonthTo] = useState("");
    console.log("1" + month);
    console.log("2" + month_to);

    var mal_id = getUrlVars()["id"];
    // console.log(mal_id);
    // var loaded = false;
    useEffect(() => {
        const getan = () => {
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
                            setImageUrl(
                                response.data.images.jpg.large_image_url
                            );
                            setTrailer(response.data.trailer.embed_url);
                            // setMonthFrom(response.data.aired.prop);
                            setLoaded(true);
                            console.log(loaded);
                            //     poster_container_div = `<img id="backdrop" src="${response.data.images.jpg.large_image_url}" />
                            // <img id="poster" src="${response.data.images.jpg.large_image_url}" />`;
                            //     $("#poster_container").html(poster_container_div);

                            console.log(animes.aired);
                            setAir(animes.aired);
                            console.log(air.from);

                            setDate(new Date(
                                response.data.aired.prop.from.year,
                                response.data.aired.prop.from.month - 1,
                                response.data.aired.prop.from.day
                            ));
                            setDateTo(new Date(
                                response.data.aired.prop.to.year,
                                response.data.aired.prop.to.month - 1,
                                response.data.aired.prop.to.day
                            ));
                            setMonth(date.toLocaleString("default", {
                                month: "long",
                            }));
                            setMonthTo(date_to.toLocaleString("default", {
                                month: "long",
                            }));
                            console.log("1" + month);
                            console.log("2" + month_to);
                        },
                    });
                    await $.ajax({
                        dataType: "json",
                        method: "get",
                        url: `https://api.jikan.moe/v4/anime/${mal_id}/recommendations`,
                        success: function (responses) {
                            let output = "";
                            $.each(responses.data, function (i, recomm) {
                                console.log(recomm.entry);
                                output += `<div class="anime_posters_conatiner"><img class="anime_posters"  id="${recomm.entry.mal_id}"src="${recomm.entry.images.jpg.image_url}" title="${recomm.entry.title}"></div>`;
                                return i < 4;
                            });
                            // console.log(response);
                            $("#recommendations_tab").html(output);
                        },
                    });
                }
            });
            $("#recommendations_tab").on("click", "div img", function () {
                console.log($(this).attr("id"));
                var id_img = $(this).attr("id");
                window.location.href = `http://localhost:3000/pages/${id_img}/?id=${id_img}`;
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
            {/* <Nav username={username} /> */}
            <Nav />
            <div className="page_body">
                {animes ? (
                    <div id="poster_container">
                        <p id="title">{animes.title}</p>
                        <Suspense fallback={<h1>LOADING....</h1>}>
                            <img id="backdrop" src={`${imageUrl}`} alt="" />
                        </Suspense>
                        <img id="poster" src={`${imageUrl}`} alt="" />
                    </div>
                ) : (
                    "LOADING"
                )}

                {/* Box below the poster */}
                <div className="statistics">
                    <div className="ep_duration">
                        <p className="statistics_heading">Episode Duration</p>
                        <span>{animes.duration}</span>
                    </div>

                    <div className="status">
                        <p className="statistics_heading">Status</p>
                        <span>{animes.status}</span>
                    </div>

                    <div className="start_date">
                        <p className="statistics_heading">Start Date</p>
                        {animes?.aired?.prop?.from?.day ? (
                            <span>
                                {animes.aired.prop.from.day}/{animes.aired.prop.from.month}{"/"}
                                {animes.aired.prop.from.year}
                            </span>
                        ) : (
                            " "
                        )}
                    </div>

                    <div className="end_date">
                        <p className="statistics_heading">End Date</p>
                        {animes?.aired?.prop?.to?.day ? (
                            <span>
                                {animes.aired.prop.to.day}/{animes.aired.prop.to.month}{"/"}
                                {animes.aired.prop.to.year}
                            </span>
                        ) : (
                            <span>Ongoing</span>
                        )}
                    </div>

                    <div className="season">
                        <p className="statistics_heading">Season</p>
                        {animes?.aired?.prop?.from?.year && animes.season ? (
                            <span>
                                {animes.season}, {animes.aired.prop.from.year}
                            </span>
                        ) : (
                            " "
                        )}
                    </div>

                    <div className="type">
                        <p className="statistics_heading">Type</p>
                        {animes.type ? <span>{animes.type}</span> : " "}
                    </div>
                    <div className="source">
                        <p className="statistics_heading">Source</p>
                        {animes.source ? (
                            <span>{animes.source}</span>
                        ) : (
                            <i>Unknown</i>
                        )}
                    </div>

                    <div className="episodes">
                        <p className="statistics_heading">Episodes</p>
                        {animes.episodes ? (
                            <span>{animes.episodes}</span>
                        ) : (
                            <span>
                                <i>Unknown</i>
                            </span>
                        )}
                    </div>
                    <div className="popularity">
                        <p className="statistics_heading">Popularity</p>
                        {animes.popularity ? (
                            <span>{animes.popularity}</span>
                        ) : (
                            <span>
                                <i>Unknown</i>
                            </span>
                        )}
                    </div>

                    <div className="title_english">
                        <p className="statistics_heading">Title(English)</p>
                        {animes.title_english ? (
                            <span>{animes.title_english}</span>
                        ) : (
                            <span>{animes.title_synonyms}</span>
                        )}
                    </div>
                </div>

                {/* main content */}
                <div className="page_content">
                    <div id="synopsis">
                        <p className="content_headings">Synopsis</p>
                        <p>{animes.synopsis}</p>
                    </div>
                    {animes.genres ? (
                        <div id="genres">
                            <p className="content_headings">Genres</p>
                            <p>
                                {animes.genres.map((genre) => (
                                    <span className="genre">{genre.name}</span>
                                ))}
                            </p>
                        </div>
                    ) : (
                        "LOADING"
                    )}

                    <div id="rating">
                        <p className="content_headings">Audience</p>
                        <p> {animes.rating}</p>
                    </div>

                    <div id="score">
                        <p className="content_headings">Rating</p>
                        {animes.score ? (
                            <span
                                className="genre"
                                style={{ backgroundColor: "#00e600" }}
                            >
                                {animes.score}
                            </span>
                        ) : (
                            <span
                                className="genre"
                                style={{ backgroundColor: "grey" }}
                            >
                                <i>NA</i>
                            </span>
                        )}
                    </div>

                    {animes.broadcast ? (
                        <div id="time">
                            <p className="content_headings">
                                Broadcasting Schedule
                            </p>
                            {animes.broadcast.string ? (
                                <span>
                                    <TodayIcon id="cal_icon" />
                                    {animes.broadcast.string}
                                </span>
                            ) : (
                                <span>
                                    <TodayIcon id="cal_icon" />
                                    NA
                                </span>
                            )}
                        </div>
                    ) : (
                        "LOADING"
                    )}

                    {animes.studios ? (
                        <div id="studios">
                            <p className="content_headings">Stuidos</p>
                            <p>
                                {animes.studios.map((studio) => (
                                    <span className="genre studio">
                                        {studio.name}
                                    </span>
                                ))}
                            </p>
                        </div>
                    ) : (
                        "LOADING"
                    )}
                    {animes.producers ? (
                        <div id="producers">
                            <p className="content_headings">Producers</p>
                            <p>
                                {animes.producers.map((producer) => (
                                    <span className="genre producer">
                                        {producer.name}
                                    </span>
                                ))}
                            </p>
                        </div>
                    ) : (
                        "LOADING"
                    )}
                    <div id="licensors">
                        <p className="content_headings">Licensors</p>
                        {animes.licensors ? (
                            <p>
                                {animes.licensors.map((licensor) => (
                                    <span className="genre licensor">
                                        {licensor.name}
                                    </span>
                                ))}
                            </p>
                        ) : (
                            <span
                                className="genre"
                                style={{ backgroundColor: "grey" }}
                            >
                                <i>NA</i>
                            </span>
                        )}
                    </div>
                    <div className="video_container">
                        <button className="page_btn" id="launch_btn">
                            LAUNCH TRAILER
                        </button>
                        <SlideDown>
                            <ReactPlayer url={trailer} controls="True" />
                        </SlideDown>
                        <div>{/* Code for video such */}</div>
                        <button
                            // onClick={useQuery}
                            className="page_btn"
                            id="back_btn"
                            onClick={() =>
                                history.push(`/${auth.currentUser.uid}`)
                            }
                        >
                            Back
                        </button>
                    </div>
                    <br></br>
                    {/* recommendations container */}
                    <p className="content_headings">Recommendations</p>
                    <div id="recommendations_tab"></div>
                </div>
            </div>
        </>
    );
}

export default Pages;
