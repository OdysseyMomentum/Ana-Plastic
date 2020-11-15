import Scene from "../components/game/Scene";

export const config = {
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
