import { ListIteratingSystem } from '@ash.ts/ash';
import { Gun, GunControls, Position } from '../components';
import { EntityCreator } from '../EntityCreator';
import { KeyPoll } from '../KeyPoll';
import { GunControlNode } from '../nodes';
import shootSound from '../sounds/shoot.mp3';

export class GunControlSystem extends ListIteratingSystem<GunControlNode> {
  private keyPoll:KeyPoll;

  private creator:EntityCreator;

  public constructor(keyPoll:KeyPoll, creator:EntityCreator) {
    super(GunControlNode);
    this.keyPoll = keyPoll;
    this.creator = creator;
  }

  public updateNode(node:GunControlNode, time:number):void {
    const { control } = node;
    const { position } = node;
    const { gun } = node;

    gun.shooting = this.keyPoll.isDown(control.trigger);
    gun.timeSinceLastShot += time;
    if (gun.shooting && gun.timeSinceLastShot >= gun.minimumShotInterval) {
      this.creator.createUserBullet(gun, position);
      node.audio.play(shootSound);
      gun.timeSinceLastShot = 0;
    }
  }
}
