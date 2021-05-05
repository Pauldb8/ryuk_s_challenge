import { isBuffer } from 'node:util';
import PIXI from 'pixi.js/dist/pixi'

export class EpisodeFirst {
  private map;
  private app;
  private episode_number;
  private stage;

  constructor() {
    this.app = new PIXI.Application({width: 512, height: 512, backgroundColor: 0x000000 });
    this.stage = this.app.stage;
    this.loadSprites();
  }

  /**
   * Getting the episode number from the url
   */
  activate(params) {
    this.episode_number = params.number; // Episode 1, 2 ..
  }

  bind() {
    this.initialize();
  }
  
  initialize() {
    let type = "WebGL"
    if(!PIXI.utils.isWebGLSupported()){
      type = "canvas"
    }

    this.map.appendChild(this.app.view);
    PIXI.utils.sayHello(type);
  }

  loadSprites() {

    PIXI.loader// je sais pas. On verra demain
    //je vais me reposer :). Bon taf cependant oui, bonne soirée ;)
      .add("/static/assets/cobrauclown.png")
      .load(this.setup)
    //let sprite = new PIXI.Sprite(texture);
  }

  setup() {
    let sprite = new PIXI.Sprite(
      PIXI.loader.resources["images/anyImage.png"].texture
    );
  }
}
