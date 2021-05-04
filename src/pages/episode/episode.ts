import * as PIXI from 'pixi.js'

export class Episode {
  private map;
  private app;
  
  constructor() {
    this.app = new PIXI.Application({width: 256, height: 256, backgroundColor: 0x000000 });
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
}
