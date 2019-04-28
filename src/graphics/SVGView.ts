export class SVGView {
  public readonly element:SVGElement;

  public x:number = 0;
  public y:number = 0;
  public r:number = 0;

  constructor() {
    this.element = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  }

  public setTransform(x:number = 0, y:number = 0, r:number = 0):this {
    this.x = x;
    this.y = y;
    this.r = r;
    return this.setAttribute('transform', `translate(${x}, ${y}) rotate(${r * 180 / Math.PI})`);
  }

  public setContent(content:string):this {
    this.element.innerHTML = content;
    return this;
  }

  public setAttribute(key:string, value:string):this {
    this.element.setAttribute(key, value);
    return this;
  }

  public addChild(child:SVGView) {
    this.element.appendChild(child.element);
  }

  public removeChild(child:SVGView) {
    this.element.removeChild(child.element);
  }
}
