import React, { useEffect, useState } from 'react'
import $, { get } from "jquery";
import { useHistory } from 'react-router-dom';
import './Airanime.css'

function Airanime() {
    const [airanimes, setairAnimes] = useState();
    const history = useHistory

    useEffect(() => {
       $(
           async function () {
            await $.ajax({
                dataType: "json",
                url: "https://api.jikan.moe/v3/top/anime/0/airing",
                method: "get",
                success:  function (responses) {
                  //   console.log(responses);
                  let upcoming_anime = "";
                  $.each(responses.top, function (i, response) {
                    // console.log(response);
                    upcoming_anime += `<div class="anime_posters_conatiner" ><img class="anime_posters" id="${response.mal_id}"src="${response.image_url}" title="${response.title}" onClick={() => history.push("/page/${response.mal_id}/?yid="${response}"&ban="${response}")}></div>`;
                    
                  });
                  
                  $("#anime_airing").html(upcoming_anime).on("click",() => history.push(`/page/${responses[0].mal_id}/?yid="${responses[0]}"&ban="${responses[0]}`));
                  setairAnimes(() => responses.data)
                  console.log(airanimes);
                },
              });
           }
       ) 
    })

    return (
        <div id="anime_airing">
        {/* {airanimes.map((response) => (
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

export default Airanime
