import { SVGView } from './SVGView';

export class AsteroidView extends SVGView {
  constructor(radius:number) {
    super();

    let p = '';
    let angle:number = 0;

    p += `M${radius} 0`;
    while(angle < Math.PI * 2) {
      const length:number = (0.75 + Math.random() * 0.25) * radius;
      const posX:number = Math.cos(angle) * length;
      const posY:number = Math.sin(angle) * length;
      p += `L${posX} ${posY} `;
      angle += Math.random() * 0.5;
    }
    p += `L${radius} 0`;

    this.setContent(`<path d="${p}" fill="#fff"/>`);
  }
}
