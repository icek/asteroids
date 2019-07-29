import { Signal0 } from '@ash.ts/ash';
import { SVGView } from './SVGView';

export class WaitForStartView extends SVGView {
  private readonly gameOver:SVGView;

  private readonly clickToStart:SVGView;

  public click:Signal0 = new Signal0();

  public constructor() {
    super();

    // GAME OVER
    this.gameOver = new SVGView()
      .setContent('<text class="h1">ASTEROIDS</text>')
      .setTransform(0, -50, 0);

    this.addChild(this.gameOver);

    this.clickToStart = new SVGView()
      .setContent('<text class="h2">Click to start</text>')
      .setTransform(0, 50, 0);

    this.addChild(this.clickToStart);

    // EVENTS
    this.element.addEventListener('DOMNodeInsertedIntoDocument', this.addClickListener);
    this.element.addEventListener('DOMNodeRemovedFromDocument', this.removeClickListener);
  }

  private dispatchClick = () => {
    this.click.dispatch();
  };

  private addClickListener = () => {
    window.addEventListener('click', this.dispatchClick);
  };

  private removeClickListener = () => {
    window.removeEventListener('click', this.dispatchClick);
    this.gameOver.setContent('<text class="h1">GAME OVER</text>');
  };
}
