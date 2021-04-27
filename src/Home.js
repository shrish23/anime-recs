import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import "./Home.css";
import $, { get } from "jquery";
// import { Modal } from "@material-ui/core";
import SimpleModal from "./components/Modal/Modal";
import { useDispatch } from "react-redux";
import { animehandle } from "./features/userSlice";
import { Redirect, useHistory } from "react-router";
// import Modals from "materialize-css";
import { auth } from "./firebase";
import Modals from "./components/Modal/Modal";
import { Modal } from "@material-ui/core";
// import spinner from "./components/Spinner/Spinner";
// import Airanime from "./Airanime";
import { Movie } from "@material-ui/icons";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import { Slider } from "materialize-css";

function Home({ username }) {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const [animes, setAnimes] = useState([]);
    const [airanimes, setairAnimes] = useState([]);
    const [manimes, setmAnimes] = useState([]);
    const history = useHistory();
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    useEffect(() => {
        const getan = async () => {
            //Top anime
            $.ajax({
                dataType: "json",
                url: "https://api.jikan.moe/v4/top/anime",
                method: "get",
                success: function (responses) {
                    //   console.log(responses);
                    // let upcoming_anime = "";
                    // $.each(responses.data, function (i, response) {
                    //   // console.log(response);
                    //   upcoming_anime += `<div class="anime_posters_conatiner" key={Math.random()}><img class="anime_posters" id="${response.mal_id}"src="${response.images.jpg.large_image_url}" title="${response.title}" onClick={() => history.push("/page/${response.mal_id}/?yid="${response.trailer.url}"&ban="${response.images.jpg.large_image_url}")}/></div>`;
                    // });
                    // $("#anime_top").html(upcoming_anime);
                    console.log(responses.data);
                    setAnimes(responses.data);
                    console.log(animes);
                },
            });
            //Currently Airing
            $.ajax({
                dataType: "json",
                url: "https://api.jikan.moe/v3/top/anime/0/airing",
                method: "get",
                success: function (responses) {
                    //   console.log(responses);
                    // let upcoming_anime = "";
                    // $.each(responses.top, function (i, response) {
                    //   // console.log(response);
                    //   upcoming_anime += `<div class="anime_posters_conatiner" ><img class="anime_posters" id="${response.mal_id}"src="${response.image_url}" title="${response.title}"></div>`;
                    // });
                    // $("#anime_airing").html(upcoming_anime);
                    setairAnimes(responses.top);
                    console.log(airanimes);
                },
            });
            //Anime movies
            $.ajax({
                dataType: "json",
                url: "https://api.jikan.moe/v3/top/anime/0/movie",
                method: "get",
                success: function (responses) {
                    //   console.log(responses);
                    // let upcoming_anime = "";
                    // $.each(responses.top, function (i, response) {
                    //   // console.log(response);
                    //   upcoming_anime += `<div class="anime_posters_conatiner"><img class="anime_posters"  id="${response.mal_id}"src="${response.image_url}" title="${response.title}"></div>`;
                    // });
                    // $("#anime_movies").html(upcoming_anime);
                    setmAnimes(responses.top);
                    console.log(responses.top);
                },
            });

            //Search Request
            var req_data = "";
            $(".anime_bar").on("keyup", function () {
                req_data = $(".anime_bar").val();
                if (req_data === "" || null) {
                    $("#anime_tab").html(<p></p>);
                    $("#search_results").slideUp();
                }
                console.log(req_data);
                $.ajax({
                    dataType: "json",
                    url: "https://api.jikan.moe/v4/anime",
                    method: "get",
                    data: {
                        q: req_data,
                        // rating: "pg",
                    },
                    success: function (responses) {
                        // console.log(responses);
                        $("#search_results").slideDown();
                        let output = "";
                        $.each(responses.data, function (i, response) {
                            //   console.log(response);
                            output += `<div class="anime_posters_conatiner"><img class="anime_posters"  id="${response.mal_id}"src="${response.images.jpg.large_image_url}" title="${response.title}"></div>`;
                        });
                        $("#anime_tab").html(output);
                    },
                });
            });
        };

        getan();
    }, []);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Nav username={username} />
            <div className="movie_container">
                <form>
                    <input
                        placeholder="Search"
                        type="text"
                        className="anime_bar"
                    />
                </form>
                <p className="headings" id="search_results">
                    Search Results
                </p>

                <div id="anime_tab"></div>
                <p class="headings">Top Anime</p>
                {/* {$() ? ( */}

                {/* ) : (
          <Modal
            disablePortal
            disableEnforceFocus
            disableAutoFocus
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            HELLO
          </Modal>
        )} */}

                {/* {open ? <SimpleModal/> : <></>} */}
                <hr></hr>
                <div id="anime_top">
                    {animes.map((response) => (
                        <div
                            className="anime_posters_conatiner"
                            key={Math.random()}
                        >
                            <img
                                className="anime_posters"
                                id={`${response.mal_id}`}
                                src={`${response.images.jpg.large_image_url}`}
                                title={`${response.title}`}
                                alt=""
                                onClick={() =>
                                    history.push(
                                        `/page/${response.mal_id}/?id=${response.mal_id}&yid="${response.trailer.url}"&ban=${response.images.jpg.large_image_url}`
                                    )
                                }
                            />
                        </div>
                    ))}
                </div>
                <p class="headings">Airing Anime</p>
                <hr></hr>

                <div id="anime_airing">
                    {airanimes.map((response) => (
                        <div
                            class="anime_posters_conatiner"
                            key={Math.random()}
                        >
                            <img
                                class="anime_posters"
                                id={`${response.mal_id}`}
                                src={`${response.image_url}`}
                                title={`${response.title}`}
                                alt=""
                                onClick={() =>
                                    history.push(
                                        `/pages/?id=${response.mal_id}&ban=${response.image_url}`
                                    )
                                }
                            />
                        </div>
                    ))}
                </div>
                {/* <Airanime /> */}
                <p class="headings">Anime Movies</p>
                <hr></hr>
                <div id="anime_movies">
                    {manimes.map((response) => (
                        <div
                            class="anime_posters_conatiner"
                            key={Math.random()}
                        >
                            <img
                                class="anime_posters"
                                id={`${response.mal_id}`}
                                src={`${response.image_url}`}
                                title={`${response.title}`}
                                alt=""
                                onClick={() =>
                                    history.push(
                                        `/pages/?id=${response.mal_id}&ban=${response.image_url}`
                                    )
                                }
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
