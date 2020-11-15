import "phaser";
import map from "../../assets/images/largemap.png";
import Donut from "./Donut";
import donutImage from "../../assets/images/donut.png";


class Scene extends Phaser.Scene {
  private balance: number;

  private info: any;

  constructor(balance = 100) {
    super("scene");
    this.balance = balance;
  }

  preload() {
    this.load.image("donutbase", donutImage);
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

    this.input.on(
      "gameobjectup",
      function (pointer, gameObject) {
        gameObject.emit("clicked", gameObject);
      },
      this
    );

    this.info = this.add.text(10, 10, "", { font: "68px Arial", fill: "red" });
  }

  update() {
    this.info.setText(`Balance: ${this.balance}`);
  }

  /* eslint-disable no-param-reassign */
  clickHandler(oldBox?: any) {
    const box = oldBox;
    this.balance -= 10;
    box.off("clicked", this.clickHandler);
    box.input.enabled = false;
    box.setVisible(false);
  }
  /* eslint-disable no-param-reassign */

  create() {
    this.cameras.main.setBounds(0, 0, 2048, 2048);
    this.add.image(0, 0, "map").setOrigin(0);
    this.loadDiamonds(20);
    const donut = new Donut(this, {});
  }
}

export default Scene;
