import "phaser";
import map from "../../assets/images/largemap.png";

class Scene extends Phaser.Scene {
  constructor() {
    super("scene");
  }

  preload() {
    this.load.image("map", map);

    const pixelWidth = 2;
    const star: Array<string> = [
      ".....828.....",
      "....72227....",
      "....82228....",
      "...7222227...",
      "2222222222222",
      "8222222222228",
      ".72222222227.",
      "..787777787..",
      "..877777778..",
      ".78778887787.",
      ".27887.78872.",
      ".787.....787.",
    ];

    this.textures.generate("star", { data: star, pixelWidth });
  }

  loadDiamonds(amountOfDiamonds: number) {
    for (let i = 0; i < amountOfDiamonds; i += 1) {
      const x: number = Phaser.Math.Between(50, 1500);
      const y: number = Phaser.Math.Between(50, 1500);

      const box = this.add.image(x, y, "star");

      box.setInteractive();
      box.on("clicked", this.clickHandler, this);
    }
  }

  /* eslint-disable no-param-reassign */
  clickHandler(oldBox?: any) {
    const box = oldBox;
    box.off("clicked", this.clickHandler);
    box.input.enabled = false;
    box.setVisible(false);

  }
  /* eslint-disable no-param-reassign */

  create() {
    this.cameras.main.setBounds(0, 0, 2048, 2048);
    this.add.image(0, 0, "map").setOrigin(0);
    this.loadDiamonds(20);
  }
}

export default Scene;
