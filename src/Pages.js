import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { auth } from "./firebase";
import movieTrailer from "movie-trailer";
import Nav from "./Nav";
import { useHistory } from "react-router";
import styled from "styled-components";

function Pages({ username }) {
  const [malId, setMalId] = useState("");
  // USE malId TO ACCESS THE ID OF THE ANIME WHICH WILL BE AVILABLE AFTER CLICKING THE BUTTON. THE ID IS IN STRING SO IF YOU WANT YOU CAN CONVERT IT
  const [imageUrl, setImageUrl] = useState("");

  const history = useHistory();

  useEffect(() => {
    const proc = () => {
      const ur = new URLSearchParams(window.location.search);
      // console.log(ur.get("id"));
      if (imageUrl) {
        setImageUrl("");
        setMalId("");
      } else {
        setImageUrl(ur.get("ban"));
        setMalId(ur.get("id"));
      }
      console.log(malId);
    };
    return proc;
  });

  // const handleClick = () => {
  //   const ur = new URLSearchParams(window.location.search);
  //   console.log(ur.get("id"));
  //   if (malId) {
  //     setMalId("");
  //   } else {
  //     setMalId(ur.get("id"));
  //   }
  //   console.log(malId);
  // };

  return (
    <Container img={imageUrl}>
      <Nav username={username} />
      <div className="page_body">
        <Button variant="contained" color="primary">
          LAUNCH TRAILER
        </Button>
        <div>
          {/* Code for video such */}
        </div>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => history.push(`/${auth.currentUser.uid}`)}
        >
          Back
        </Button>
      </div>
    </Container>
  );
}

const Container = styled.div``;

export default Pages;
