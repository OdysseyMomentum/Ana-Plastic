import Phaser from "phaser";

class Donut extends Phaser.GameObjects.Graphics {
  width = document.body.clientHeight;

  height = document.body.clientWidth;

  constructor(scene: Phaser.Scene, options) {
    super(scene, options);

    const donut = scene.add.container(this.height - 280, this.width - 200);
    const donutImageBase = scene.add.sprite(0, 0, "donutbase").setOrigin(0);

    donut.add(donutImageBase);
    // this.insertPolygon(scene, );
  }

  insertPolygon = (scene, container) => {
    const polygon = new Phaser.Geom.Polygon([
      new Phaser.Geom.Point(this.height - 250, this.width - 140),
      new Phaser.Geom.Point(this.height - 170, this.width - 130),
      new Phaser.Geom.Point(this.height - 130, this.width - 140),
      new Phaser.Geom.Point(this.height - 10, this.width - 80),
    ]);

    const graphics = scene.add.graphics({
      lineStyle: { width: 10, color: 0xFF0000 },
      fillStyle: { color: 0xFF0000, alpha: 0.4 },
    });

    graphics.beginPath();

    graphics.moveTo(polygon.points[0].x, polygon.points[0].y);

    for (let i = 1; i < polygon.points.length; i++) {
      graphics.lineTo(polygon.points[i].x, polygon.points[i].y);
    }

    graphics.closePath();
    graphics.fillPath();
  }
}

export default Donut;
