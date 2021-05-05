import { isBuffer } from 'node:util';
import * as PIXI from 'pixi.js'

export class EpisodeFirst {
  private map;
  private app;
  private loader;
  private resources;
  private Sprite;
  private episode_number;
  private stage;

  // Appelé en premier
  constructor() {
    this.app = new PIXI.Application({backgroundColor: 0x000000 });//fait crtl molette sur le frontend
    this.loader = PIXI.Loader.shared;
    this.resources = this.loader.resources;
    this.Sprite = PIXI.Sprite;

    this.setFullScreen();
  }

  // appelé en troisième
  bind() {
    this.initialize();
    this.loadSprites();
  }

  setFullScreen() {
    this.app.renderer.view.style.position = "absolute";
    this.app.renderer.view.style.display = "block";
    this.app.renderer.autoResize = true;
    this.app.renderer.resize(window.innerWidth, window.innerHeight);
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
    this.loader.add("/assets/cobrau_clown.png")
      .load(setup);
    let that = this;

    function setup() {
        let tete_de_clown = new that.Sprite(
          that.resources["/assets/cobrau_clown.png"].texture
        );
        that.app.stage.addChild(tete_de_clown); //Let's see 
      }
  }

  /**
   * Sets up the different Sprites (texture from an image)
   * and adds it to the stage
   */
}
