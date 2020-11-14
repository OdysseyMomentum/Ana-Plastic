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
var t = -1;
var duration = 20000;
var tempLine = new Phaser.Geom.Line();
var swimming_curves = []
var swimming_entities = []

class Scene extends Phaser.Scene {
  
  constructor() {
    super("scene");
  }

  preload() {
    this.load.image('shark', shark);
    this.load.image('map', map);
    this.load.image('turtle', turtle);
    this.load.image('tuna', tuna);
    this.load.image('humpback', humpback);
    this.load.image('fishing_boat', fishing_boat);
    this.load.image('cruise_ship', cruise_ship);
    this.load.image('plastic', plastic);
    this.load.image('sargassum', sargassum);

  }

  create() {
    this.cameras.main.setBounds(0, 0, 2048, 2048);
    this.add.image(0, 0, 'map').setOrigin(0);
    this.initialize_swimming_entities();
  }

  update (time, delta)
  { 
    console.log(t)
      if (t === -1)
      {
          return;
      }
      t += delta;
      if (t >= duration)
      {
        // repeat animation
          t = 0;
      }
      else
      {
          var d = (t / duration);
          for(let i = 0; i<swimming_curves.length; i++){
            let curve = swimming_curves[i];
            let entity = swimming_entities[i];
            var p = curve.getPoint(d);
            entity.setPosition(p.x, p.y);
          }
      }
  }

  initialize_swimming_entities(){
    this.populate_swimming_curves();
  
    let entity = this.add.image(0, 0, 'shark');
    entity.setScale(1/2);
    swimming_entities.push(entity)
    entity = this.add.image(0, 0, 'turtle');
    entity.setScale(1/8);
    swimming_entities.push(entity)
    entity = this.add.image(0, 0, 'tuna');
    entity.setScale(1/8);
    swimming_entities.push(entity)
    entity = this.add.image(0, 0, 'humpback');
    entity.setScale(1/3);
    swimming_entities.push(entity)
    entity = this.add.image(0, 0, 'fishing_boat');
    entity.setScale(1/2);
    swimming_entities.push(entity)
    entity = this.add.image(0, 0, 'cruise_ship');
    entity.setScale(1/8);
    swimming_entities.push(entity)
    entity = this.add.image(0, 0, 'plastic');
    entity.setScale(1/6);
    swimming_entities.push(entity)
    entity = this.add.image(0, 0, 'sargassum');
    entity.setScale(1/5);
    swimming_entities.push(entity)
    t = 0;
  }

  populate_swimming_curves(){
    let graphics = this.add.graphics();
    graphics.lineStyle(0, 0xffffff, 1);

    let curve = new Phaser.Curves.Spline(this.get_points(100, 1000, 1900, 300, 100, -100, 3));
    curve.draw(graphics, 64);
    swimming_curves.push(curve)

    curve = new Phaser.Curves.Spline(this.get_points(2000, 900, 350, 450, 30, -90, 3));
    curve.draw(graphics, 64);
    swimming_curves.push(curve)

    curve = new Phaser.Curves.Spline(this.get_points(1200, -300, 300, 1900, 30, -90, 3));
    curve.draw(graphics, 64);
    swimming_curves.push(curve)

    curve = new Phaser.Curves.Spline(this.get_points(2600, 500, 300, 1200, 30, -90, 3));
    curve.draw(graphics, 100);
    swimming_curves.push(curve)

    curve = new Phaser.Curves.Spline(this.get_points(900, 550, 905, 555, 30, -90, 3));
    curve.draw(graphics, 100);
    swimming_curves.push(curve)

    curve = new Phaser.Curves.Spline(this.get_points(1800, 0, 1100, 1200, 150, -55, 5));
    curve.draw(graphics, 3);
    swimming_curves.push(curve)

    curve = new Phaser.Curves.Spline(this.get_points(2000, 0, 1500, 0, 11, -55, 2));
    curve.draw(graphics, 3);
    swimming_curves.push(curve)

    curve = new Phaser.Curves.Spline(this.get_points(700, 700, 705, 705, 30, -90, 3));
    curve.draw(graphics, 2);
    swimming_curves.push(curve)

  }

  get_points(x1, y1, x2, y2, curve1, curve2, modulus){
    let line = new Phaser.Geom.Line(x1, y1, x2, y2);
    let points = [];
    points.push(line.getPointA());
    const length = Phaser.Geom.Line.Length(line);
    const waves = Math.ceil(length / 200);
    let vx = 100;
    let vy = 100;
    let prevX = line.x1;
    let prevY = line.y1;

    for (let i = 1; i <= waves; i++)
    {
        let currentPoint = line.getPoint(i / waves);
        let ray = new Phaser.Geom.Line(prevX, prevY, currentPoint.x, currentPoint.y);
        let normal = Phaser.Geom.Line.GetNormal(ray);
        let midPoint = Phaser.Geom.Line.GetMidPoint(ray);
        if(i%modulus === 0){
            points.push(new Phaser.Math.Vector2(midPoint.x + normal.x * vx, midPoint.y + normal.y * vy));
        }
        else {
            points.push(new Phaser.Math.Vector2(midPoint.x + curve1 + normal.x * vx, midPoint.y - curve2 + normal.y * vy));
        }
        prevX = currentPoint.x;
        prevY = currentPoint.y;

        vx *= -1;
        vy *= -1;
    }

    points.push(line.getPointB());
    return points;
  }

  
}

export default Scene;
