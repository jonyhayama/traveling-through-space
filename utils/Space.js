export class Space {
  setCanvas(canvas) {
    this.ctx = canvas.getContext("2d");
    this.width = canvas.width;
    this.height = canvas.height;
    this.CENTER = new Vec(this.width / 2, this.height / 2);
  }

  setAttributes({ stars, colors, Z, positionRadius, starStyle, vel, addAlpha }){
    this.Z = Z;
    this.positionRadius = positionRadius;
    this.starStyle = starStyle;
    this.colors = colors;
    this.vel = vel;
    this.addAlpha = addAlpha;

    this.stars = new Array(stars).fill(null).map(() => new Star({
      color: this.randomColor(),
      space: this
    }));
  }

  randomColor() {
    return this.colors[Math.floor(Math.random() * this.colors.length)]
  }

  update() {
    this.stars.forEach((star) => star.update());
  }

  draw() {
    this.stars.forEach((star) => star.draw(this.ctx));
  }

  run() {
    this.update();
    this.stars.sort((a, b) => b.pos.components[2] - a.pos.components[2]);
    this.draw();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
}