import React, { ReactElement } from "react";
import "phaser";
import Box from "@material-ui/core/Box";
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

  return (
    <Box display="flex">
      <Box m="auto" textAlign="center">
        <div id="game" className="game-screen" />
      </Box>
    </Box>
  );
}

export default Game;
