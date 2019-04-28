import { Engine, RAFTickProvider } from '@ash.ts/ash';

import { EntityCreator } from './EntityCreator';
import { GameConfig } from './GameConfig';
import { KeyPoll } from './KeyPoll';

import asteroidSound from './sounds/asteroid.mp3';
import shipSound from './sounds/ship.mp3';
import shootSound from './sounds/shoot.mp3';

import {
  AnimationSystem,
  AudioSystem,
  BulletAgeSystem,
  CollisionSystem,
  DeathThroesSystem,
  GameManager,
  GunControlSystem,
  HudSystem,
  MotionControlSystem,
  MovementSystem,
  RenderSystem,
  SystemPriorities,
  WaitForStartSystem,
} from './systems';

export class Asteroids {
  private readonly engine:Engine;
  private readonly tickProvider:RAFTickProvider;
  private readonly creator:EntityCreator;
  private readonly keyPoll:KeyPoll;
  private readonly config:GameConfig;
  private readonly audioContext = new AudioContext();
  private readonly audioDB = new Map<string, AudioBuffer>();

  constructor(private container:HTMLElement, width:number, height:number) {
    this.engine = new Engine();
    this.creator = new EntityCreator(this.engine);
    this.keyPoll = new KeyPoll();
    this.config = new GameConfig(width, height);
    this.tickProvider = new RAFTickProvider();
  }

  public async start():Promise<void> {
    await this.loadSounds();
    this.tickProvider.add(delta => this.engine.update(delta));
    this.tickProvider.start();
  }

  private async loadSounds() {
    const soundNames = [asteroidSound, shipSound, shootSound];
    const promises = soundNames.map(name => this.loadSound(name));
    await Promise.all(promises);
    this.init();
  }

  private async loadSound(url:string):Promise<void> {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
    this.audioDB.set(url, audioBuffer);
  }

  private init() {
    this.engine.addSystem(new WaitForStartSystem(this.creator), SystemPriorities.preUpdate);
    this.engine.addSystem(new GameManager(this.creator, this.config), SystemPriorities.preUpdate);
    this.engine.addSystem(new MotionControlSystem(this.keyPoll), SystemPriorities.update);
    this.engine.addSystem(new GunControlSystem(this.keyPoll, this.creator), SystemPriorities.update);
    this.engine.addSystem(new BulletAgeSystem(this.creator), SystemPriorities.update);
    this.engine.addSystem(new DeathThroesSystem(this.creator), SystemPriorities.update);
    this.engine.addSystem(new MovementSystem(this.config), SystemPriorities.move);
    this.engine.addSystem(new CollisionSystem(this.creator), SystemPriorities.resolveCollisions);
    this.engine.addSystem(new AnimationSystem(), SystemPriorities.animate);
    this.engine.addSystem(new HudSystem(), SystemPriorities.animate);
    this.engine.addSystem(new RenderSystem(this.container), SystemPriorities.render);
    this.engine.addSystem(new AudioSystem(this.audioContext, this.audioDB), SystemPriorities.audio);

    this.creator.createWaitForClick();
    this.creator.createGame();
  }
}
