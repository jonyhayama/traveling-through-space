import { Vec } from './Vec'

const random = {
  uniform: (min, max) => Math.random() * (max - min) + min,
};

export class Star {
  constructor({ color, space }) {
    this.positionRadius = {
      unscaled: (_) => random.uniform(0, this.space.height),
      space: (scale) => random.uniform(this.space.height / scale, this.space.height) * scale,
      tunnel: (scale) => random.uniform(this.space.height / 4, this.space.height / 3) * scale
    }
    this.starStyle = {
      square: {
        sizeRatio: 0.2,
        draw: (ctx) => {
          ctx.fillStyle = this.color;

          ctx.beginPath();
          ctx.rect(this.screenPos.components[0], this.screenPos.components[1], this.size, this.size);
          ctx.closePath();
          ctx.fill();
        },
      },
      circle: {
        sizeRatio: 0.4,
        draw: (ctx) => {
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(this.screenPos.components[0],  this.screenPos.components[1], this.size, 0, 2 * Math.PI, false);
          ctx.closePath();
          ctx.fill();
        },
      },
      circleGradient: {
        sizeRatio: random.uniform(0.09, 0.2),
        draw: (ctx) => {
          const gradient = ctx.createRadialGradient(this.screenPos.components[0], this.screenPos.components[1], this.size*0.15, this.screenPos.components[0], this.screenPos.components[1], this.size);

          gradient.addColorStop(0, this.color);
          gradient.addColorStop(1, "transparent");
          ctx.fillStyle = gradient;

          ctx.beginPath();
          ctx.arc(this.screenPos.components[0],  this.screenPos.components[1], this.size, 0, 2 * Math.PI, false);
          ctx.closePath();
          ctx.fill();
        }
      }
    }
    this.color = color;
    this.space = space;
    this.pos = this.getPosition();
    this.screenPos = new Vec(0, 0);
    this.vel = random.uniform(this.space.vel[0], this.space.vel[1]);
  }

  getPosition(scale = 35) {
    const angle = random.uniform(0, 2 * Math.PI);
    const radius = this.positionRadius[this.space.positionRadius](scale);

    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    return new Vec(x, y, this.space.Z);
  }

  update() {
    this.pos.components[2] -= this.vel;
    this.pos = this.pos.components[2] < 1 ? this.getPosition() : this.pos;
    this.screenPos = new Vec(this.pos.components[0], this.pos.components[1])
      .div(new Vec(this.pos.components[2], this.pos.components[2]))
      .add(this.space.CENTER);

    this.size = this.space.positionRadius === 'unscaled'
      ? this.space.Z / this.pos.components[2]
      : (this.space.Z - this.pos.components[2]) / (this.pos.components[2] * this.starStyle[this.space.starStyle].sizeRatio);

    this.pos.rotateXY(0.003);
  }

  draw(ctx) {
    if (this.space.addAlpha) {
      ctx.globalAlpha = this.size / this.space.Z;
    }
    this.starStyle[this.space.starStyle].draw(ctx);
  }
}