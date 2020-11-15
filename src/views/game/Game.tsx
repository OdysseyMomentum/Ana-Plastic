import React, { ReactElement } from "react";
import "phaser";
import Box from "@material-ui/core/Box";
import { config } from "../../utils/phaserConfig";

function Game(): ReactElement {
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
