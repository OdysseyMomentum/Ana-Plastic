import "phaser";
import diamond from "../../assets/images/diamond.png";
import map from "../../assets/images/largemap.png";

class Scene extends Phaser.Scene {
  constructor() {
    super("scene");
  }

  loadDiamonds(amountOfDiamonds: number) {
    for (let i = 0; i < amountOfDiamonds; i = i + 1) {
      const x: number = Phaser.Math.Between(0, 2048);
      const y: number = Phaser.Math.Between(0, 2048);

      const box = this.add.image(x, y, diamond);

      box.setInteractive();
      box.on("clicked", this.clickHandler, this);
    }
  }

  clickHandler(box?: any) {
    box.off("clicked", this.clickHandler);
    box.input.enabled = false;
    box.setVisible(false);
  }

  preload() {
    this.load.image("map", map);
  }

  create() {
    this.cameras.main.setBounds(0, 0, 2048, 2048);
    this.add.image(0, 0, "map").setOrigin(0);
    this.loadDiamonds(20);
  }
}

export default Scene;
