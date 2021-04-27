import React, { useEffect, useState } from 'react'
import $, { get } from "jquery";
import { useHistory } from 'react-router-dom';

function TopAnime() {
    const [animes, setAnimes] = useState();
    const history = useHistory();

    useEffect(() => {
        $(
            function () {
              $.ajax({
                dataType: "json",
                url: "https://api.jikan.moe/v4/top/anime",
                method: "get",
                success:  function (responses) {
                  //   console.log(responses);
                  let upcoming_anime = "";
                  $.each(responses.data, function (i, response) {
                    // console.log(response);
                    upcoming_anime += `<div class="anime_posters_conatiner" key={Math.random()}><img class="anime_posters" id="${response.mal_id}"src="${response.images.jpg.large_image_url}" title="${response.title}" onClick={() => history.push("/page/${response.mal_id}/?yid="${response.trailer.url}"&ban="${response.images.jpg.large_image_url}")}/></div>`;
                  });
                  $("#anime_top").html(upcoming_anime);
                  console.log(responses.data);
                  setAnimes(responses.data);
                  console.log(animes);
                  //   dispatch(
                  //     animehandle({
                  //       animes: responses.data,
                  //     })
                  //   );
                },
              });
            }
        ) 
     },[animes]);


    return (
        <div id="anime_top">
          {/* {animes.map((response) => (
            <div class="anime_posters_conatiner" key={Math.random()}>
             
              <img
                class="anime_posters"
                id={`${response.mal_id}`}
                src={`${response.images.jpg.large_image_url}`}
                title={`${response.title}`}
                alt=""
                onClick={() => history.push(`/page/${response.mal_id}/?yid="${response.trailer.url}"&ban="${response.images.jpg.large_image_url}"`)}
              />
              
            </div>
          ))} */}
        </div>
    )
}

export default TopAnime
