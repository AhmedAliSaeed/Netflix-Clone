// import React from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [apiData, setApiData] = useState([
    {
      name: "",
      key: "",
      type: "",
      published_at: "",
    },
  ]);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMGYwMjhkNzk4NTQ3ZjRjZGRhMWI2MGMxZDIzNjk4ZiIsIm5iZiI6MTczODI0NTU4MC4yNDYsInN1YiI6IjY3OWI4NWNjMzY1ODY3NTM1YWJkODhhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B2wURJvgGPxqjuFo-Ddmez62IMgqxc8eBtrX1cEHpds",
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results[0]))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="player">
      <img src={back_arrow_icon} alt="" onClick={() => navigate(-2)} />
      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${apiData.key}`}
        // frameborder="0"
        allowFullScreen
        title="trailer"
      ></iframe>
      <div className="player-info">
        <p>{apiData.published_at?.slice(0, 10) || <></>}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
