import { SVGView } from './SVGView';

export class HudView extends SVGView {
  private readonly score:SVGView;
  private readonly lives:SVGView;

  constructor() {
    super();
    this.setTransform(400, 50);


    this.score = new SVGView()
      .setTransform(-200, 0);

    this.addChild(this.score);

    this.lives = new SVGView()
      .setTransform(200, 0);
    this.addChild(this.lives);

    this.setScore(0);
    this.setLives(3);
  }

  public setScore(value:number):void {
    this.score.setContent(`<text>SCORE: ${value}</text>`);
  }

  public setLives(value:number):void {
    this.lives.setContent(`<text>LIVES: ${value}</text>`);
  }
}
