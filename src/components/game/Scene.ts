import "phaser";
import map from "../../assets/images/largemap.png";
import shark from "../../assets/images/shark.png";


var curve;
var moving_shark;
var t = -1;
var duration = 5000;
var tempLine = new Phaser.Geom.Line();

class Scene extends Phaser.Scene {
  
  constructor() {
    super("scene");
  }

  preload() {
    this.load.image('shark', shark);
    this.load.image('map', map);
  }

  create() {
    this.cameras.main.setBounds(0, 0, 2048, 2048);
    this.add.image(0, 0, 'map').setOrigin(0);

    this.swimming_shark();
    
  }

  update (time, delta)
  {
    
      if (t === -1)
      {
          return;
      }
      t += delta;
      if (t >= duration)
      {
          //  Reached the end
          moving_shark.setVelocity(0, 0);
      }
      else
      {
        console.log(delta)
          var d = (t / duration);
          var p = curve.getPoint(d);
          moving_shark.setPosition(p.x, p.y);
      }
  }

  swimming_shark(){
    let graphics = this.add.graphics();
    let line = new Phaser.Geom.Line(500, 950, 1900, 300);
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
        if(i%3 === 0){
            points.push(new Phaser.Math.Vector2(midPoint.x + normal.x * vx, midPoint.y + normal.y * vy));
        }
        else {
            points.push(new Phaser.Math.Vector2(midPoint.x + 100 + normal.x * vx, midPoint.y - 100 + normal.y * vy));
        }
        prevX = currentPoint.x;
        prevY = currentPoint.y;

        vx *= -1;
        vy *= -1;
    }

    points.push(line.getPointB());
    curve = new Phaser.Curves.Spline(points);
    graphics.lineStyle(3, 0xffffff, 1);
    curve.draw(graphics, 64);
    moving_shark = this.matter.add.image(line.x1, line.y1, 'shark');
    moving_shark.setScale(1/3);

    this.input.once('pointerdown', function () {
        t = 0;
    }, this);

    // var d = (t / duration);
    // var p = curve.getPoint(d);
    // moving_shark.setPosition(p.x, p.y);

  }

}

export default Scene;
