import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { csrfFetch } from "../../store/csrf";

const TagPage = () => {
  const [games, setGames] = useState([]);
  const { name } = useParams();
  console.log(name);

  useEffect(() => {
    const fetchGames = async () => {
      const response = await csrfFetch(`/api/tags/${name}`);
      const data = await response.json();
      setGames(data.games);
    };

    fetchGames();
  }, [name]);

  return (
    <div>
      <h2>Games for Tag: {name}</h2>
      {games.map((game) => (
        <div key={game.id}>
          <h3>{game.title}</h3>
          <p>{game.description}</p>
          {/* Render other game properties here */}
        </div>
      ))}
    </div>
  );
};

export default TagPage;
