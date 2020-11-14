import "phaser";
import map from "../../assets/images/map.png";

class Scene extends Phaser.Scene {
  constructor() {
    super("scene");
  }

  preload() {

    this.load.image('map', map);
  }

  create() {
    this.cameras.main.setBounds(0, 0, 2048, 2048);
    this.add.image(0, 0, 'map').setOrigin(0);
  }
}

export default Scene;
