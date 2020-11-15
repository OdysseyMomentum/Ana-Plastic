import "phaser";
import map from "../../assets/images/largemap.png";
import shark from "../../assets/images/shark.png";
import turtle from "../../assets/images/green-sea-turtle.png";
import tuna from "../../assets/images/bluefintuna.png";
import humpback from "../../assets/images/humpback.png";
import fishing_boat from "../../assets/images/fishing-boat.png";
import cruise_ship from "../../assets/images/cruise-ship.png";
import plastic from "../../assets/images/plastic.png";
import microplastic from "../../assets/images/microplastics.png";
import plasticbag from "../../assets/images/plasticbag.png";
import sargassum from "../../assets/images/Sargassum.png";
import intro from "../../assets/video/intro.mp4";

// var curve;
let t = -1;
const duration = 20000;
// var tempLine = new Phaser.Geom.Line();
let swimming_entities = []
let video;
let intro_is_over = false;
let self;

class Scene extends Phaser.Scene {
  private balance: number;
  private dollar_balance: number;

  private balance_text: any;
  private dollar_balance_text: any;
  private entity_cruise_ship: any;

  private happiness_text: any;
  private sea_life_text: any;
  private plastic_text: any;
  private sea_level_text: any;
  private ph_text: any;
  private o2_text: any;
  private co2_text: any;
  private nutrition_text: any;
  private noise_text: any;
  private temp_text: any;
  private parameters= {
    "happiness": 50,
    "sea_life": 10,
    "plastic": 50,
    "sea_level": 21, // change cm since 1900
    "ph": 8.1,
    "o2": 210000, // parts per million
    "co2": 409.8, //parts per million in 2019
    "nutrition": 10,
    "noise": 10,
    "temp": 0.95, // deg C, 2019
  };
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
    self = this;
    this.balance = Phaser.Math.Between(50, 150);
    this.dollar_balance = Phaser.Math.Between(1, 10);
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
    this.load.image("plasticbag", plasticbag);
    this.load.image("microplastic", microplastic);
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
    this.init_text_labels();

  }

  init_text_labels(){
    this.balance_text = this.add.text(20, 20, "", { font: "26px Arial", fill: "#00CED1" , backgroundColor: "white"});
    this.dollar_balance_text = this.add.text(20, 50, "$ " + this.dollar_balance, { font: "26px Arial", fill: "#1E90FF" , backgroundColor: "white"});
    let param_style = {font: "14px Arial", fill: "#66CDAA" , backgroundColor: "white"}
    this.happiness_text = this.add.text(20, 100, "Happiness: " + this.parameters.happiness, param_style);
    this.sea_life_text = this.add.text(20, 116, "Sea life: " + this.parameters.sea_life, param_style);
    this.plastic_text = this.add.text(20, 132, "Plastic: " + this.parameters.plastic, param_style);
    this.sea_level_text = this.add.text(20, 148, "Sea level: " + this.parameters.sea_level, param_style);
    this.ph_text = this.add.text(20, 160, "PH level: " + this.parameters.ph, param_style);
    this.o2_text = this.add.text(20, 176, "O2: " + this.parameters.o2, param_style);
    this.co2_text = this.add.text(20, 192, "CO2: " + this.parameters.co2, param_style);
    this.nutrition_text = this.add.text(20, 208, "Nutrition: " + this.parameters.nutrition, param_style);
    this.noise_text = this.add.text(20, 224, "Noise: " + this.parameters.noise, param_style);
    this.temp_text = this.add.text(20, 240, "Temp: " + this.parameters.temp, param_style);
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
    if(intro_is_over){
      
      this.balance_text.setText(`Balance: ${this.balance}`);
      this.plastic_text.setText(`Plastic: ${this.parameters["plastic"]}`)
      this.happiness_text.setText(`Happiness: ${this.parameters["happiness"]}`)
      
      if (t === -1) {
        return;
      }
      t += delta;
      if (t >= duration) {
        // repeat animation
        t = 0;
      } else {
        const d = t / duration;
        for (let i = 0; i < swimming_entities.length; i += 1) {
          const p = swimming_entities[i]["curve"].getPoint(d);
          swimming_entities[i]["image"].setPosition(p.x, p.y);
        }
      }
    }
  }

  initialize_swimming_entities() {
    const graphics = this.add.graphics();
    graphics.lineStyle(0, 0xffffff, 1);

    swimming_entities = [
      {
        "image": this.add.image(0, 0, "shark").setScale(1 / 2),
        "curve": new Phaser.Curves.Spline(
          this.get_points(100, 1000, 1900, 300, 100, -100, 3)
        )
      },
      {
        "image": this.add.image(0, 0, "turtle").setScale(1 / 5),
        "curve": new Phaser.Curves.Spline(
          this.get_points(2000, 900, 350, 450, 30, -90, 3)
        )
      },
      {
        "image": this.add.image(0, 0, "tuna").setScale(1 / 8),
        "curve": new Phaser.Curves.Spline(
          this.get_points(1200, -300, 300, 1900, 30, -90, 3)
        )
      },
      {
        "image": this.add.image(0, 0, "humpback").setScale(1 / 3),
        "curve": new Phaser.Curves.Spline(
          this.get_points(2600, 500, 300, 1200, 30, -90, 3)
        )
      },
      {
        "image": this.add.image(0, 0, "fishing_boat").setScale(1 / 2),
        "curve": new Phaser.Curves.Spline(
          this.get_points(900, 550, 905, 555, 30, -90, 3)
        )
      },
      {
        "image": this.add.image(0, 0, "cruise_ship").setScale(1 / 7).setInteractive().on("clicked", this.dump_plastic),
        "curve": new Phaser.Curves.Spline(
          this.get_points(1800, 0, 1100, 1200, 150, -55, 5)
        )
      },
      {
        "image": this.add.image(0, 0, "sargassum").setScale(1 / 6),
        "curve": new Phaser.Curves.Spline(
          this.get_points(700, 700, 705, 705, 30, -90, 3)
        )
      },
    ];

    this.input.on(
      "gameobjectup",
      function (pointer, gameObject) {
        gameObject.emit("clicked", gameObject, false);
      },
      this
    );
    
    t = 0;
  }


  get_rundom_plastic_image(x, y){
    let r = Phaser.Math.Between(0, 2)
    let img;
    if(r === 0){
      img = self.add.image(x, y, "microplastic").setScale(1/6);
    } else if(r === 1){
      img = self.add.image(x, y, "plasticbag").setScale(1/6);
    }else if (r === 2){
      img = self.add.image(x, y, "plastic").setScale(1/6);
    }
    return img;
  }


dump_plastic(g_obj){
  let image = self.get_rundom_plastic_image(g_obj.x, g_obj.y).setScale(1/6).setInteractive()
  image.on("clicked", self.collect_plastic)
  swimming_entities.push(
      {
        "curve": self.get_rundom_swimming_curve(g_obj.x, g_obj.y),
        "image": image
    }
  );
  self.input.on(
    "collectobjectup",
    function (pointer, gameObject) {
      gameObject.emit("clicked", gameObject, true);
    },
    self
  );
  self.parameters["plastic"] += 1;
  self.parameters["happiness"] += 1;
}

collect_plastic(obj){
  const box = obj;
  box.off("clicked", this.clickHandler);
  box.input.enabled = false;
  box.setVisible(false);
  self.parameters["plastic"] -= 1;
}

  get_rundom_swimming_curve(start_x, start_y){
    const graphics = this.add.graphics();
    graphics.lineStyle(0, 0xffffff, 1);
    let curve = new Phaser.Curves.Spline(
      this.get_points(
        // Phaser.Math.Between(300, 2500),
        start_x,
        // Phaser.Math.Between(50, 1500),
        start_y,
        Phaser.Math.Between(300, 2500),
        Phaser.Math.Between(50, 1500),
        Phaser.Math.Between(1, 300),
        Phaser.Math.Between(1, 300),
        Phaser.Math.Between(1, 11)
      )
      );
    curve.draw(graphics, Phaser.Math.Between(1, 100));
    return curve;
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
