import "phaser";
import map from "../../assets/images/largemap.png";
import shark from "../../assets/images/shark.png";
import turtle from "../../assets/images/green-sea-turtle.png";
import tuna from "../../assets/images/bluefintuna.png";
import humpback from "../../assets/images/humpback.png";
import fishing_boat from "../../assets/images/fishing-boat.png";
import cruise_ship from "../../assets/images/cruise-ship.png";
import plastic from "../../assets/images/plastic.png";
import sargassum from "../../assets/images/Sargassum.png";

// var curve;
let t = -1;
const duration = 20000;
// var tempLine = new Phaser.Geom.Line();
const swimming_curves = [];
const swimming_entities = [];

class Scene extends Phaser.Scene {
  private balance: number;

  private info: any;

  constructor(balance = 100) {
    super("scene");
    this.balance = balance;
  }

  preload() {
    this.load.image("shark", shark);
    this.load.image("map", map);
    this.load.image("turtle", turtle);
    this.load.image("tuna", tuna);
    this.load.image("humpback", humpback);
    this.load.image("fishing_boat", fishing_boat);
    this.load.image("cruise_ship", cruise_ship);
    this.load.image("plastic", plastic);
    this.load.image("sargassum", sargassum);
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
    this.initialize_swimming_entities();
    this.loadDiamonds(20);
  }

  update(time, delta) {
    this.info.setText(`Balance: ${this.balance}`);
    console.log(t);
    if (t === -1) {
      return;
    }
    t += delta;
    if (t >= duration) {
      // repeat animation
      t = 0;
    } else {
      const d = t / duration;
      for (let i = 0; i < swimming_curves.length; i += 1) {
        const curve = swimming_curves[i];
        const entity = swimming_entities[i];
        const p = curve.getPoint(d);
        entity.setPosition(p.x, p.y);
      }
    }
  }

  initialize_swimming_entities() {
    this.populate_swimming_curves();

    let entity = this.add.image(0, 0, "shark");
    entity.setScale(1 / 2);
    swimming_entities.push(entity);
    entity = this.add.image(0, 0, "turtle");
    entity.setScale(1 / 8);
    swimming_entities.push(entity);
    entity = this.add.image(0, 0, "tuna");
    entity.setScale(1 / 8);
    swimming_entities.push(entity);
    entity = this.add.image(0, 0, "humpback");
    entity.setScale(1 / 3);
    swimming_entities.push(entity);
    entity = this.add.image(0, 0, "fishing_boat");
    entity.setScale(1 / 2);
    swimming_entities.push(entity);
    entity = this.add.image(0, 0, "cruise_ship");
    entity.setScale(1 / 8);
    swimming_entities.push(entity);
    entity = this.add.image(0, 0, "plastic");
    entity.setScale(1 / 6);
    swimming_entities.push(entity);
    entity = this.add.image(0, 0, "sargassum");
    entity.setScale(1 / 5);
    swimming_entities.push(entity);
    t = 0;
  }

  populate_swimming_curves() {
    const graphics = this.add.graphics();
    graphics.lineStyle(0, 0xffffff, 1);

    let curve = new Phaser.Curves.Spline(
      this.get_points(100, 1000, 1900, 300, 100, -100, 3)
    );
    curve.draw(graphics, 64);
    swimming_curves.push(curve);

    curve = new Phaser.Curves.Spline(
      this.get_points(2000, 900, 350, 450, 30, -90, 3)
    );
    curve.draw(graphics, 64);
    swimming_curves.push(curve);

    curve = new Phaser.Curves.Spline(
      this.get_points(1200, -300, 300, 1900, 30, -90, 3)
    );
    curve.draw(graphics, 64);
    swimming_curves.push(curve);

    curve = new Phaser.Curves.Spline(
      this.get_points(2600, 500, 300, 1200, 30, -90, 3)
    );
    curve.draw(graphics, 100);
    swimming_curves.push(curve);

    curve = new Phaser.Curves.Spline(
      this.get_points(900, 550, 905, 555, 30, -90, 3)
    );
    curve.draw(graphics, 100);
    swimming_curves.push(curve);

    curve = new Phaser.Curves.Spline(
      this.get_points(1800, 0, 1100, 1200, 150, -55, 5)
    );
    curve.draw(graphics, 3);
    swimming_curves.push(curve);

    curve = new Phaser.Curves.Spline(
      this.get_points(2000, 0, 1500, 0, 11, -55, 2)
    );
    curve.draw(graphics, 3);
    swimming_curves.push(curve);

    curve = new Phaser.Curves.Spline(
      this.get_points(700, 700, 705, 705, 30, -90, 3)
    );
    curve.draw(graphics, 2);
    swimming_curves.push(curve);
  }

  get_points = (x1, y1, x2, y2, curve1, curve2, modulus) => {
    const line = new Phaser.Geom.Line(x1, y1, x2, y2);
    const points = [];
    points.push(line.getPointA());
    const length = Phaser.Geom.Line.Length(line);
    const waves = Math.ceil(length / 200);
    let vx = 100;
    let vy = 100;
    let prevX = line.x1;
    let prevY = line.y1;

    for (let i = 1; i <= waves; i += 1) {
      const currentPoint = line.getPoint(i / waves);
      const ray = new Phaser.Geom.Line(
        prevX,
        prevY,
        currentPoint.x,
        currentPoint.y
      );
      const normal = Phaser.Geom.Line.GetNormal(ray);
      const midPoint = Phaser.Geom.Line.GetMidPoint(ray);
      if (i % modulus === 0) {
        points.push(
          new Phaser.Math.Vector2(
            midPoint.x + normal.x * vx,
            midPoint.y + normal.y * vy
          )
        );
      } else {
        points.push(
          new Phaser.Math.Vector2(
            midPoint.x + curve1 + normal.x * vx,
            midPoint.y - curve2 + normal.y * vy
          )
        );
      }
      prevX = currentPoint.x;
      prevY = currentPoint.y;

      vx *= -1;
      vy *= -1;
    }

    points.push(line.getPointB());
    return points;
  };
}

export default Scene;
