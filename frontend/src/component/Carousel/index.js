import React, { useState } from "react";
import { Carousel as ResponsiveCarousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Carousel.css";
import { useHistory } from "react-router-dom";
import csgo from "../../assets/images/csgo.png";
import lostark from "../../assets/images/lostark.png";
import DBD from "../../assets/images/DBD.png";
import dbd1 from "../../assets/images/DBD-ingame1.png";
import dbd2 from "../../assets/images/DBD-ingame2.png";
import dbd3 from "../../assets/images/DBD-ingame3.png";
import dbd4 from "../../assets/images/DBD-ingame4.png";
import csgo1 from "../../assets/images/csgo-ingame1.png";
import csgo2 from "../../assets/images/csgo-ingame2.png";
import csgo3 from "../../assets/images/csgo-ingame3.png";
import csgo4 from "../../assets/images/csgo-ingame4.png";
import la1 from "../../assets/images/la-ingame1.png";
import la2 from "../../assets/images/la-ingame2.png";
import la3 from "../../assets/images/la-ingame3.png";
import la4 from "../../assets/images/la-ingame4.png";

// list of game images
const gameData = [
  {
    image: csgo,
    title: "Counter-Strike: Global Offensive",
    description:
      "Counter-Strike: Global Offensive (CS:GO) is a round-based, 5v5 tactical FPS with an Attackers vs. Defenders setup and no respawns, meaning if a player is eliminated they will not respawn until the next round. The game is available to download from the STEAM Games Client",
    inGameImages: [csgo1, csgo2, csgo3, csgo4],
    url: "https://www.github.com",
  },
  {
    image: lostark,
    title: "Lost Ark",
    description:
      "Lost Ark provides a unique dungeon experience. You'll face monsters and bosses for loot, but you can choose to play solo in the Abyss Dungeon or with a party in the Chaos Dungeons. Just like everything else in Lost Ark, your choices will decide your destiny.",
    inGameImages: [la1, la2, la3, la4],
    url: "https://www.github.com",
  },
  {
    image: DBD,
    title: "Dead By Daylight",
    description:
      "Dead by Daylight is a multiplayer (4vs1) horror game where one player takes on the role of the savage Killer, and the other four players play as Survivors, trying to escape the Killer and avoid being caught, tortured and killed. Survivors play in third-person and have the advantage of better situational awareness.",
    inGameImages: [dbd1, dbd2, dbd3, dbd4],
    url: "https://www.github.com",
  },
  // ... other games
];

function Carousel() {
  const [hoveredImage, setHoveredImage] = useState(null);
  const history = useHistory();

  return (
    <ResponsiveCarousel
      showThumbs={false}
      autoPlay
      interval={5000}
      infiniteLoop
      useKeyboardArrows
      dynamicHeight
    >
      {gameData.map((game, idx) => (
        <div key={idx} className={`carousel-slide`}>
          <img
            className="carousel-slide-image"
            src={hoveredImage || game.image}
            alt={game.title}
            style={{ display: hoveredImage ? "none" : "block" }}
            onClick={() => history.push(game.url)}
          />

          {hoveredImage && (
            <img src={hoveredImage} className="carousel-slide-image-hovered" />
          )}
          <div className="carousel-slide-content">
            <h2>{game.title}</h2>
            <p>{game.description}</p>
            <div className="carousel-slide-ingame-images">
              {game.inGameImages.map((img, id) => (
                <img
                  key={id}
                  src={img}
                  alt={`in-game-${id}`}
                  onMouseEnter={() => {
                    setHoveredImage(img);
                  }}
                  onMouseLeave={() => {
                    setHoveredImage(null);
                  }}
                  onClick={() => history.push(game.url)}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </ResponsiveCarousel>
  );
}

export default Carousel;
// import React, { useState, useEffect } from "react";
// import { Carousel as ResponsiveCarousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import "./Carousel.css";
// import { useHistory } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchGames } from "../../store/gamesReducer";

// function Carousel() {
//   const [hoveredImage, setHoveredImage] = useState(null);
//   const history = useHistory();
//   const dispatch = useDispatch();
//   const games = useSelector((state) => state.games.slice(0, 3)); // Take only the first 3 games

//   useEffect(() => {
//     dispatch(fetchGames()); // Fetch games data from the backend
//   }, [dispatch]);

//   return (
//     <ResponsiveCarousel
//       showThumbs={false}
//       autoPlay
//       interval={5000}
//       infiniteLoop
//       useKeyboardArrows
//       dynamicHeight
//     >
//       {games.map((game) => (
//         <div key={game.id} className={`carousel-slide`}>
//           <img
//             className="carousel-slide-image"
//             src={hoveredImage || game.image}
//             alt={game.title}
//             style={{ display: hoveredImage ? "none" : "block" }}
//             onClick={() => history.push(`/games/${game.id}`)}
//           />

//           {hoveredImage && (
//             <img src={hoveredImage} className="carousel-slide-image-hovered" />
//           )}
//           <div className="carousel-slide-content">
//             <h2>{game.title}</h2>
//             <p>{game.description}</p>
//             <div className="carousel-slide-ingame-images">
//               {game.inGameImages.map((img, id) => (
//                 <img
//                   key={id}
//                   src={img}
//                   alt={`in-game-${id}`}
//                   onMouseEnter={() => {
//                     setHoveredImage(img);
//                   }}
//                   onMouseLeave={() => {
//                     setHoveredImage(null);
//                   }}
//                   onClick={() => history.push(`/games/${game.id}`)}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       ))}
//     </ResponsiveCarousel>
//   );
// }

// export default Carousel;
