import React, { ReactElement } from "react";
import Phaser from "phaser";
import Box from "@material-ui/core/Box";
import Donut from "../../components/game/Donut";
import Scene from "../../components/game/Scene";

function Game(): ReactElement {
  const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 1200,
    scene: Scene,
    physics: {
      default: "matter",
      matter: {
        debug: true,
        gravity: {
          x: 0,
          y: 0,
        },
      },
    },
  };

  const game: Phaser.Game = new Phaser.Game(config);
  game.scale.scaleMode = Phaser.Scale.RESIZE;

  const scene = game.scene[0];

  return (
    <Box display="flex">
      <Box m="auto" textAlign="center">
        <div id="game" className="game-screen" />
      </Box>
      {/* <div className="game-box">
        <div className="money">
          {scene.balance} 
        </div>
      </div> */}
    </Box>
  );
}

export default Game;
