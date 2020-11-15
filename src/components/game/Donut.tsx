import Phaser from "phaser";

class Donut extends Phaser.GameObjects.Graphics {
  width = document.body.clientHeight;

  height = document.body.clientWidth;

  constructor(scene: Phaser.Scene, options) {
    super(scene, options);

    const donut = scene.add.container(this.height - 280, this.width - 200);
    const donutImageBase = scene.add.sprite(0, 0, "donutbase").setOrigin(0);

    donut.add(donutImageBase);
    this.insertPolygon(scene, donut);
  }

  insertPolygon = (scene: Phaser.Scene, container) => {
    const polygon = new Phaser.Geom.Polygon([
      new Phaser.Geom.Point(100, 40),
      new Phaser.Geom.Point(150, 60),
      new Phaser.Geom.Point(150, 80),
      new Phaser.Geom.Point(140, 160),
      new Phaser.Geom.Point(50, 100),
      new Phaser.Geom.Point(80, 40),
    ]);
    // '200,10 250,190 160,210'
    const graphics = scene.add.graphics({
      lineStyle: { width: 5, color: 0xFF0000 },
      fillStyle: { color: 0xFF0000, alpha: 0.4 },
    });

    graphics.beginPath();

    graphics.moveTo(polygon.points[0].x, polygon.points[0].y);

    for (let i = 1; i < polygon.points.length; i++) {
      graphics.lineTo(polygon.points[i].x, polygon.points[i].y);
    }

    graphics.closePath();
    graphics.strokePath();
    //graphics.fillPath();

    container.add(graphics);
  }
}

export default Donut;
