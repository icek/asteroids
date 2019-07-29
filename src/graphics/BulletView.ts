import { SVGView } from './SVGView';

export class BulletView extends SVGView {
  public constructor() {
    super();

    this.setContent('<g><circle cx="0" cy="0" r="2.5" fill="#fff"/></g>');
  }
}
