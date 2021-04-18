import React, { useEffect } from "react";
import Nav from "./Nav";
import "./Home.css";
import $, { get } from "jquery";

function Home({ username }) {
    useEffect(() => {
        $(function () {
            //Top anime
            $.ajax({
                dataType: "json",
                url: "https://api.jikan.moe/v4/top/anime",
                method: "get",
                success: function (responses) {
                    console.log(responses);
                    let upcoming_anime = "";
                    $.each(responses.data, function (i, response) {
                        console.log(response);
                        upcoming_anime += `<div class="anime_posters_conatiner"><img class="anime_posters"  id="${response.mal_id}"src="${response.images.jpg.large_image_url}" title="${response.title}"></div>`;
                    });
                    $("#anime_top").html(upcoming_anime);
                },
            });
            //Currently Airing
            $.ajax({
                dataType: "json",
                url: "https://api.jikan.moe/v3/top/anime/0/airing",
                method: "get",
                success: function (responses) {
                    console.log(responses);
                    let upcoming_anime = "";
                    $.each(responses.top, function (i, response) {
                        console.log(response);
                        upcoming_anime += `<div class="anime_posters_conatiner"><img class="anime_posters"  id="${response.mal_id}"src="${response.image_url}" title="${response.title}"></div>`;
                    });
                    $("#anime_airing").html(upcoming_anime);
                },
            });
            //Anime movies
            $.ajax({
                dataType: "json",
                url: "https://api.jikan.moe/v3/top/anime/0/movie",
                method: "get",
                success: function (responses) {
                    console.log(responses);
                    let upcoming_anime = "";
                    $.each(responses.top, function (i, response) {
                        console.log(response);
                        upcoming_anime += `<div class="anime_posters_conatiner"><img class="anime_posters"  id="${response.mal_id}"src="${response.image_url}" title="${response.title}"></div>`;
                    });
                    $("#anime_movies").html(upcoming_anime);
                },
            });

            //Search Request
            var req_data = "";
            $(".anime_bar").on("keyup", function () {
                req_data = $(".anime_bar").val();
                if (req_data == "" || null) {
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
                        console.log(responses);
                        $("#search_results").slideDown();
                        let output = "";
                        $.each(responses.data, function (i, response) {
                            console.log(response);
                            output += `<div class="anime_posters_conatiner"><img class="anime_posters"  id="${response.mal_id}"src="${response.images.jpg.large_image_url}" title="${response.title}"></div>`;
                        });
                        $("#anime_tab").html(output);
                    },
                });
            });
        });
    });
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
                <p class="headings" id="search_results">
                    Search Results
                </p>
                <div id="anime_tab"></div>
                <p class="headings">Top Anime</p>
                <hr></hr>
                <div id="anime_top"></div>
                <p class="headings">Airing Anime</p>
                <hr></hr>
                <div id="anime_airing"></div>
                <p class="headings">Anime Movies</p>
                <hr></hr>
                <div id="anime_movies"></div>
            </div>
        </div>
    );
}

export default Home;
