import { Animatable } from './Animatable';
import { SVGView } from './SVGView';

export class SpaceshipDeathView extends SVGView implements Animatable {
  private readonly shape1:SVGView;

  private readonly shape2:SVGView;

  private readonly vel1x:number;

  private readonly vel1y:number;

  private readonly vel2x:number;

  private readonly vel2y:number;

  private readonly rot1:number;

  private readonly rot2:number;

  public constructor() {
    super();

    this.shape1 = new SVGView().setContent('<path d="M10 0 L-7 7 L-4 0 L10 0" fill="#fff"/>');
    this.addChild(this.shape1);

    this.shape2 = new SVGView().setContent('<path d="M10 0 L-7 -7 L-4 0 L10 0" fill="#fff"/>');
    this.addChild(this.shape2);

    this.vel1x = Math.random() * 10 - 5;
    this.vel1y = Math.random() * 10 + 10;
    this.vel2x = Math.random() * 10 - 5;
    this.vel2y = Math.random() * -10 - 10;
    this.rot1 = Math.random() * 3 - 1.5;
    this.rot2 = Math.random() * 3 - 1.5;
  }

  public animate(time:number):void {
    const { shape1, shape2 } = this;
    shape1.setTransform(shape1.x + this.vel1x * time, shape1.y + this.vel1y * time, shape1.r + this.rot1 * time);
    shape2.setTransform(shape2.x + this.vel2x * time, shape2.y + this.vel2y * time, shape2.r + this.rot2 * time);
  }
}
