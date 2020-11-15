import "phaser";
import map from "../../assets/images/largemap.png";

import Donut from "./Donut";
import donutImage from "../../assets/images/donut.png";

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
  public balance: number;
  public dollar_balance: number;

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
  public parameters= {
    "happiness": 50,
    "sea_life": 10,
    "plastic": 0,
    "sea_level": 21, // change cm since 1900
    "ph": 8.1,
    "o2": 210000, // parts per million
    "co2": 409.8, //parts per million in 2019
    "nutrition": 10,
    "noise": 10,
    "temp": 0.95, // deg C, 2019
  };

  private default_parameters= { // good
    "happiness": 50,
    "sea_life": 20,
    "plastic": 0,
    "sea_level": 0, // change cm since 1900
    "ph": 8.1,
    "o2": 210000, // parts per million
    "co2": 409.8, //parts per million in 2019
    "nutrition": 0, // extra nutrision
    "noise": 0,
    "temp": -0.2, // deg C, 1880
  };
  private vx;
  private vy;
  private prevX;
  private prevY;
  private length;
  private waves;
  private line;
  private points;
  private graphics: any;


  constructor() {
    super("scene");
    self = this;
    this.balance = 0;
    this.dollar_balance = Phaser.Math.Between(1, 10);
  }

  preload() {
    this.load.image("donutBase", donutImage);
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
    this.balance_text = this.add.text(20, 20, `Money: ${this.balance}`, { font: "26px Arial", fill: "#00CED1" , backgroundColor: "white"});
    this.dollar_balance_text = this.add.text(20, 50, "$ " + this.dollar_balance, { font: "26px Arial", fill: "#1E90FF" , backgroundColor: "white"});
    let param_style = {font: "18px Arial", fill: "#000080" , backgroundColor: "white"}

    this.happiness_text = this.add.text(20, 100, `Happiness: ${this.parameters["happiness"]}`, param_style);
    this.sea_life_text = this.add.text(20, 120, `Sea life: ${this.parameters["sea_life"]}`, param_style);
    this.plastic_text = this.add.text(20, 140, `Plastic: ${this.parameters["plastic"]}`, param_style);
    this.sea_level_text = this.add.text(20, 160, `Sea level: ${this.parameters["sea_level"]}`, param_style);
    this.ph_text = this.add.text(20, 180, `PH level: ${this.parameters["ph"]}`, param_style);
    this.o2_text = this.add.text(20, 200, `O2: ${this.parameters["o2"]}`, param_style);
    this.co2_text = this.add.text(20, 220, `CO2: ${this.parameters["co2"]}`, param_style);
    this.nutrition_text = this.add.text(20, 240, `Nutrition: ${this.parameters["nutrition"]}`, param_style);
    this.noise_text = this.add.text(20, 260, `Noise: ${this.parameters["noise"]}`, param_style);
    this.temp_text = this.add.text(20, 280, `Temp: ${this.parameters["temp"]}`, param_style);
  }

  update_text_labels(){
    this.balance_text.setText(`Money: ${this.balance}`);
    this.balance_text.setStyle({fill: (this.balance === 0)? "red": "blue"});

    this.happiness_text.setText(`Happiness: ${this.parameters["happiness"]}`);
    this.happiness_text.setStyle({backgroundColor: (this.parameters["happiness"] >= this.default_parameters["happiness"])? "green" :"red"});

    this.sea_life_text.setText(`Sea life: ${this.parameters["sea_life"]}`);
    this.sea_life_text.setStyle({backgroundColor: (this.parameters["sea_life"] >= this.default_parameters["sea_life"])? "green" :"red"});

    this.plastic_text.setText(`Plastic: ${this.parameters["plastic"]}`);
    this.plastic_text.setStyle({backgroundColor: (this.parameters["plastic"] <= this.default_parameters["plastic"])? "green" :"red"});

    this.sea_level_text.setText(`Sea level: ${this.parameters["sea_level"]}`);
    this.sea_level_text.setStyle({backgroundColor: (this.parameters["sea_level"] <= this.default_parameters["sea_level"])? ((this.parameters["sea_level"] === this.default_parameters["sea_level"])? "green": "#FFD700") :"red"});

    this.ph_text.setText(`PH level: ${this.parameters["ph"]}`);
    this.ph_text.setStyle({backgroundColor: (this.parameters["ph"] <= this.default_parameters["ph"])? ((this.parameters["ph"] === this.default_parameters["ph"])?"green": "#FFD700") :"red"});

    this.o2_text.setText(`O2: ${this.parameters["o2"]}`);
    this.o2_text.setStyle({backgroundColor: (this.parameters["o2"] >= this.default_parameters["o2"])? ((this.parameters["o2"] === this.default_parameters["o2"])? "green": "#FFD700") :"red"});

    this.co2_text.setText(`CO2: ${this.parameters["co2"]}`);
    this.co2_text.setStyle({backgroundColor: (this.parameters["co2"] <= this.default_parameters["co2"])? ((this.parameters["co2"] === this.default_parameters["co2"])? "green": "#FFD700") :"red"});

    this.nutrition_text.setText(`Nutrition: ${this.parameters["nutrition"]}`);
    this.nutrition_text.setStyle({backgroundColor: (this.parameters["nutrition"] <= this.default_parameters["nutrition"])? "green" :"red"});

    this.noise_text.setText(`Noise: ${this.parameters["noise"]}`);
    this.noise_text.setStyle({backgroundColor: (this.parameters["noise"] <= this.default_parameters["noise"])? "green" :"red"});

    this.temp_text.setText(`Temp: +${this.parameters["temp"]}`);
    this.temp_text.setStyle({backgroundColor: (this.parameters["temp"] > this.default_parameters["temp"])? "red" :((this.parameters["temp"] === this.default_parameters["temp"])? "green": "#FFD700")});
  }
  

  /* eslint-disable no-param-reassign */
  clickHandler(oldBox?: any) {
    if((this.balance - 10)>0){
      const box = oldBox;
      this.balance += 25;
      self.parameters["plastic"] += 1;
      self.parameters["happiness"] += 1;
      self.parameters["co2"] += 4;
      self.parameters["noise"] += 5;
      self.parameters["temp"] += 0.02;
      self.parameters["ph"] += 0.01;
      self.parameters["sea_life"] -= 4;
      box.off("clicked", this.clickHandler);
      box.input.enabled = false;
      box.setVisible(false);
    }
  }
  /* eslint-disable no-param-reassign */

  create() {
    this.cameras.main.setBounds(0, 0, 2048, 2048);
    this.add.image(0, 0, "map").setOrigin(0);
    this.graphics = this.add.graphics();
    this.initialize_swimming_entities();
    this.loadDiamonds(20);

    const donut = new Donut(this, {});

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
      
      this.update_text_labels();
      
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
    // this.graphics.lineStyle(1, 0xffffff, 1);
    swimming_entities = []
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
          this.get_points(1800, 0, 800, 1200, 150, -55, 5)
        )
      }
    ];

    this.create_sargassums(6);
    // this.create_plastics(self.parameters["plastic"]);
    
    t = 0;
  }

  // create_plastics

  create_sargassums(n){
    for(let i = 0; i<=n; i++){
      let sarg = {
        "image": this.add.image(0, 0, "sargassum").setScale(1 / 6).setInteractive().on("clicked", this.collect_sargassum),
        "curve": new Phaser.Curves.Ellipse(
          Phaser.Math.Between(200, 1500),
          Phaser.Math.Between(300, 900),
          Phaser.Math.Between(1, 300),
          Phaser.Math.Between(1, 300),
          Phaser.Math.Between(0, 360),
          Phaser.Math.Between(0, 360),
          Phaser.Math.Between(0, 1)? false: true
        )
      };
      swimming_entities.push(sarg);

    }
  }

  get_rundom_plastic_image(x, y){
    let r = Phaser.Math.Between(0, 2)
    let img;
    if(r === 0){
      img = self.add.image(x, y, "microplastic").setScale(1/3);
    } else if(r === 1){
      img = self.add.image(x, y, "plasticbag").setScale(1/6).setInteractive().on("clicked", self.collect_plastic);
    }else if (r === 2){
      img = self.add.image(x, y, "plastic").setScale(1/6).setInteractive().on("clicked", self.collect_plastic);
    }
    return img;
  }


dump_plastic(g_obj){
  let image = self.get_rundom_plastic_image(g_obj.x, g_obj.y)
  swimming_entities.push(
      {
        "curve": self.get_rundom_swimming_ellipce(g_obj.x, g_obj.y),
        "image": image
    }
  );
  self.parameters["plastic"] += 1;
  self.parameters["happiness"] += 1;
  self.parameters["co2"] += 1;
  self.parameters["noise"] += 1;
  self.parameters["temp"] += 0.002;
  self.parameters["ph"] += 0.01;
  self.parameters["sea_life"] -= 2;
  self.balance += 15;
}

collect_plastic(obj){
  const box = obj;
  box.off("clicked", self.collect_plastic);
  box.input.enabled = false;
  box.setVisible(false);

  self.balance -= 20;
  self.parameters["plastic"] -= 1;
  self.parameters["noise"] += 1;
  self.parameters["co2"] += 1;
  self.parameters["ph"] -= 0.01;
  self.parameters["temp"] -= 0.003;
  self.parameters["sea_life"] += 1;
}

collect_sargassum(obj){
  const box = obj;
  box.off("clicked", self.collect_plastic);
  box.input.enabled = false;
  box.setVisible(false);

  self.time.addEvent({
    delay: Phaser.Math.Between(6000, 100000),                // ms
    callback: self.spawn_sargassum,
    args: [box],
    loop: false
  });

  self.balance += 12;
  self.parameters["o2"] -= 2;
  self.parameters["ph"] += 0.1;
  self.parameters["temp"] += 0.01;
  self.parameters["sea_life"] -= 2;
}


spawn_sargassum(obj){
  const box = obj;
  box.on("clicked", self.collect_sargassum);
  box.input.enabled = true;
  self.input.on(
    "gameobjectup",
    function (pointer, gameObject) {
      gameObject.emit("clicked", gameObject, false);
    },
    self
  );
  box.setVisible(true);

  self.parameters["o2"] += 1;
  self.parameters["co2"] -= 2;
  self.parameters["ph"] -= 0.1;
  self.parameters["sea_life"] += 1;
  self.parameters["noise"] -= 1;
  self.parameters["temp"] -= 0.001;
}

  get_rundom_swimming_ellipce(start_x, start_y){
    this.graphics = this.add.graphics();
    this.graphics.lineStyle(0, 0xffffff, 1);
    let curve = new Phaser.Curves.Ellipse(
        start_x,
        start_y,
        Phaser.Math.Between(1, 500),
        Phaser.Math.Between(1, 500),
        Phaser.Math.Between(0, 360),
        Phaser.Math.Between(0, 360),
        Phaser.Math.Between(0, 1)? false: true
      );
    curve.draw(this.graphics, Phaser.Math.Between(1, 100));
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
