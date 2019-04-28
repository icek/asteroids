import { SVGView } from './SVGView';

export class Dot extends SVGView {
  public velocityX:number;
  public velocityY:number;

  constructor(maxDistance:number) {
    super();

    const angle:number = Math.random() * 2 * Math.PI;
    const distance:number = Math.random() * maxDistance;
    const speed:number = Math.random() * 10 + 10;
    this.velocityX = Math.cos(angle) * speed;
    this.velocityY = Math.sin(angle) * speed;

    this.setContent('<circle fill="#fff" cx="1" cy="1" r="1"/>')
      .setTransform(
        Math.cos(angle) * distance,
        Math.sin(angle) * distance,
      );
  }
}
