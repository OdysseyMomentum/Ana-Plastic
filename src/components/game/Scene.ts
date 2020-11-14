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
import intro from "../../assets/video/intro.mp4";

// var curve;
let t = -1;
const duration = 20000;
// var tempLine = new Phaser.Geom.Line();
const swimming_curves = [];
const swimming_entities = [];
let video;
let intro_is_over = false;

class Scene extends Phaser.Scene {
  private balance: number;
  private dollar_balance: number;

  private balance_text: any;
  private dollar_balance_text: any;
  private vx;
  private vy;
  private prevX;
  private prevY;
  private length;
  private waves;
  private line;
  private points;
  private points_sets: number[][];

  constructor() {
    super("scene");
    this.balance = Phaser.Math.Between(50, 150);
    this.dollar_balance = Phaser.Math.Between(1, 10);
    this.points_sets = [
      [100, 1000, 1900, 300, 100, -100, 3],
      [2000, 900, 350, 450, 30, -90, 3],
      [1200, -300, 300, 1900, 30, -90, 3],
      [2600, 500, 300, 1200, 30, -90, 3],
      [900, 550, 905, 555, 30, -90, 3],
      [1800, 0, 1100, 1200, 150, -55, 5],
      [2000, 0, 1500, 0, 11, -55, 2],
      [700, 700, 705, 705, 30, -90, 3]
    ];
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
    this.load.video('intro', intro);
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

    this.balance_text = this.add.text(20, 20, "", { font: "26px Arial", fill: "#00CED1" , backgroundColor: "white"});
    this.dollar_balance_text = this.add.text(20, 50, "$ " + this.dollar_balance, { font: "26px Arial", fill: "#1E90FF" , backgroundColor: "white"});
  }

  /* eslint-disable no-param-reassign */
  clickHandler(oldBox?: any) {
    if((this.balance - 10)>0){
      const box = oldBox;
      this.balance -= 10;
      box.off("clicked", this.clickHandler);
      box.input.enabled = false;
      box.setVisible(false);
    }
  }
  /* eslint-disable no-param-reassign */

  create() {
    this.cameras.main.setBounds(0, 0, 2048, 2048);
    this.add.image(0, 0, "map").setOrigin(0);
    this.initialize_swimming_entities();
    this.loadDiamonds(20);

    video = this.add.video(960, 500, 'intro');
    video.play(true);
    this.time.delayedCall(
        4000,                // ms
        this.stopVideo,
        []);
  }

  stopVideo(){
    intro_is_over = true;
    video.stop()
    video.destroy();
    
  }

  update(time, delta) {
    console.log(intro_is_over);
    if(intro_is_over){
      
      this.balance_text.setText(`Balance: ${this.balance}`);
      
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
    for(let i = 0; i<this.points_sets.length; i++){
      let curve = new Phaser.Curves.Spline(
        this.get_points(this.points_sets[i][0], this.points_sets[i][1], this.points_sets[i][2], this.points_sets[i][3], this.points_sets[i][4], this.points_sets[i][5], this.points_sets[i][6])
        );
        curve.draw(graphics, 64);
        swimming_curves.push(curve);
    }
  }

  get_points(x1, y1, x2, y2, curve1, curve2, modulus){
    this.line = new Phaser.Geom.Line(x1, y1, x2, y2);
    this.points = [];
    this.points.push(this.line.getPointA());
    this.length = Phaser.Geom.Line.Length(this.line);
    this.waves = Math.ceil(this.length / 200);
    this.vx = 100;
    this.vy = 100;
    this.prevX = this.line.x1;
    this.prevY = this.line.y1;
    this.generate_points_set(curve1, curve2, modulus)
    this.points.push(this.line.getPointB());
    return this.points;
  }

  generate_points_set(curve1, curve2, modulus){
    for (let i = 1; i <= this.waves; i += 1) {
      const currentPoint = this.line.getPoint(i / this.waves);
      const ray = new Phaser.Geom.Line(
        this.prevX,
        this.prevY,
        currentPoint.x,
        currentPoint.y
      );
      const normal = Phaser.Geom.Line.GetNormal(ray);
      const midPoint = Phaser.Geom.Line.GetMidPoint(ray);
      this.points.push(
        this.get_vector(i, modulus, midPoint, normal, curve1, curve2)
      );      
      this.prevX = currentPoint.x;
      this.prevY = currentPoint.y;
      this.vx *= -1;
      this.vy *= -1;
    }
  }

  get_vector(i, modulus, midPoint, normal, curve1, curve2){
    if (i % modulus === 0) {
      return  new Phaser.Math.Vector2(
          midPoint.x + normal.x * this.vx,
          midPoint.y + normal.y * this.vy
        )
      
    } else {
      return  new Phaser.Math.Vector2(
          midPoint.x + curve1 + normal.x * this.vx,
          midPoint.y - curve2 + normal.y * this.vy
        )
      
    }
  }
}



export default Scene;
