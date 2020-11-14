import React, { ReactElement } from "react";
import "phaser";
import Box from "@material-ui/core/Box";
import Scene from "../../components/game/Scene";
import { Config } from "../../types/Phaser";

function Game(): ReactElement {
  const config: Config = {
    type: Phaser.AUTO,
    backgroundColor: "#125555",
    width: 800,
    height: 600,
    scene: Scene,
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
