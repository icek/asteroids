import { Engine, NodeList, System } from '@ash.ts/ash';
import { RenderNode } from '../nodes';

export class RenderSystem extends System {
  public container:HTMLElement;

  private nodes:NodeList<RenderNode> | null = null;

  public constructor(container:HTMLElement) {
    super();
    this.container = container;
  }

  public addToEngine(engine:Engine):void {
    this.nodes = engine.getNodeList(RenderNode);
    for (let node:RenderNode | null = this.nodes.head; node; node = node.next) {
      this.addToDisplay(node);
    }
    this.nodes.nodeAdded.add(this.addToDisplay);
    this.nodes.nodeRemoved.add(this.removeFromDisplay);
  }

  private addToDisplay = (node:RenderNode):void => {
    const { displayObject } = node.display;
    this.container.appendChild(displayObject.element);
    displayObject.onAdded.dispatch();
  };

  private removeFromDisplay = (node:RenderNode):void => {
    const { displayObject } = node.display;
    this.container.removeChild(node.display.displayObject.element);
    displayObject.onRemoved.dispatch();
  };

  public update(time:number):void {
    for (let node = this.nodes!.head; node; node = node.next) {
      const { display, position } = node;
      display.displayObject.setTransform(position.x, position.y, position.rotation);
    }
  }

  public removeFromEngine(engine:Engine):void {
    this.nodes = null;
  }
}
