import { Engine, NodeList, System } from '@ash.ts/ash';
import { RenderNode } from '../nodes';

export class RenderSystem extends System {
  private nodes:NodeList<RenderNode> | null = null;

  constructor(public container:HTMLElement) {
    super();
  }

  public addToEngine(engine:Engine):void {
    this.nodes = engine.getNodeList(RenderNode);
    for (let node:RenderNode | null = this.nodes.head; node; node = node.next) {
      this.addToDisplay(node);
    }
    this.nodes.nodeAdded.add(this.addToDisplay);
    this.nodes.nodeRemoved.add(this.removeFromDisplay);
  }

  private addToDisplay = (node:RenderNode) => {
    this.container.appendChild(node.display.displayObject.element);
  };

  private removeFromDisplay = (node:RenderNode) => {
    this.container.removeChild(node.display.displayObject.element);
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
