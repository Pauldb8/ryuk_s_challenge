import { isBuffer } from 'node:util';
import * as PIXI from 'pixi.js'

export class EpisodeFirst {
  private map;
  private app;
  private episode_number;
  private stage;

  // Appelé en premier
  constructor() {
    this.app = new PIXI.Application({backgroundColor: 0x000000 });//fait crtl molette sur le frontend
    this.app.renderer.view.style.position = "absolute";
    this.app.renderer.view.style.display = "block";
    this.app.renderer.autoResize = true;
    this.app.renderer.resize(window.innerWidth, window.innerHeight);
    this.stage = this.app.stage;
  }

  // appelé en troisième
  bind() {
    this.initialize();
    this.loadSprites();
  }
  
  initialize() {
    let type = "WebGL"
    if(!PIXI.utils.isWebGLSupported()){
      type = "canvas"
    }

    this.map.appendChild(this.app.view);
    PIXI.utils.sayHello(type);
  }

  /**
   * Load multiple images as Sprites then calls the setup()
   */
  loadSprites() {
    this.app.loader
      .add("/assets/cobrau_clown.png")
      .load(this.setup);
  }

  /**
   * Sets up the different Sprites (texture from an image)
   * and adds it to the stage
   */
  setup() {
    let that = this;
    let tete_de_clown = new PIXI.Sprite(
      that.app.resources["/static/assets/cobrau_clown.png"].texture
    );
    
    this.stage.addChild(tete_de_clown); //Let's see 
  }
}
