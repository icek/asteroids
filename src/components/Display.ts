import { SVGView } from '../graphics';

export class Display {
  public displayObject:SVGView;

  public constructor(displayObject:SVGView) {
    this.displayObject = displayObject;
  }
}
