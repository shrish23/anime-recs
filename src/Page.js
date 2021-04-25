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

function Page({ username }) {
  const [trailerUrl, setTrailerUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const history = useHistory();

  useEffect(() => {
    const proc = () => {
      const ur = new URLSearchParams(window.location.search);
      // console.log(ur.get("yid"));
      if (imageUrl) {
        setImageUrl("");
      } else {
        setImageUrl(ur.get("ban"));
      }
    };
    return proc;
  });

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
    <Container img={imageUrl}>
      <Nav username={username} />
      <div className="page_body">
        <Button variant="contained" color="primary" onClick={useQuery}>
          LAUNCH TRAILER
        </Button>
        {trailerUrl && <ReactPlayer url={trailerUrl} />}
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

const Container = styled.div`
  background-image: url(${(props) => props.img}) no-repeat !important;
`;

export default Page;
