import { isBuffer } from 'node:util';
import * as PIXI from 'pixi.js'
import { Keyboard } from '../../keyboard'
import { contain } from '../../utils'

export class EpisodeFirst {
  private div_map;
  private map;
  private app;
  private loader;
  private resources;
  private Sprite;
  private episode_number;
  private stage;
  private tete_de_clown_1;
  private tete_de_clown_2;
  private width = 16;
  private height = 16
  private map_width = Math.min(window.innerWidth, window.innerHeight);
  private map_height = Math.min(window.innerWidth, window.innerHeight);
  private speed = { x:2, y: 2 };
  private background;
  private state;
  private z;
  private q;
  private s;
  private d;

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
    this.app.renderer.view.style.position = "";
    this.app.renderer.view.style.display = "block";
    this.app.renderer.autoResize = true;
    this.app.renderer.resize(this.map_width, this.map_height);
  }
  
  initialize() {
    let type = "WebGL"
    if(!PIXI.utils.isWebGLSupported()){
      type = "canvas"
    }

    this.div_map.appendChild(this.app.view);
    PIXI.utils.sayHello(type);
  }

  /**
   * Load multiple images as Sprites then calls the setup()
   */
  loadSprites() {
    this.loader.add("/assets/cobrau_clown.png")
    .add("/assets/episode_first_bg.png")
      .load(setup);
    let that = this;

    function setup() {
        that.loadBackground();
        that.loadPlayer()
        that.loadPlayer2();
        that.setKeys();
        that.state = that.play;
        that.app.ticker.add(delta => that.gameLoop(delta));
      }
  }

  loadPlayer() {
    this.tete_de_clown_1 = new this.Sprite(
      this.resources["/assets/cobrau_clown.png"].texture
    );
    this.tete_de_clown_1.position.set((this.map_width/this.width)*0, (this.map_height/this.height)*0)
    this.tete_de_clown_1.width = this.map_width/this.width
    this.tete_de_clown_1.height = this.map_height/this.height
    this.tete_de_clown_1.vx = 0
    this.tete_de_clown_1.vy = 0
    this.speed.x = this.tete_de_clown_1.width / 16
    this.speed.y = this.tete_de_clown_1.height / 16
    this.app.stage.addChild(this.tete_de_clown_1); //Let's see 
  }
  
  loadPlayer2() {
    console.log("Player 2 loaded")
    this.tete_de_clown_2 = new this.Sprite(
      this.resources["/assets/cobrau_clown.png"].texture
    );
    this.tete_de_clown_2.position.set((window.innerWidth/this.width)*15, (window.innerHeight/this.height)*0)
    this.tete_de_clown_2.width = window.innerWidth/this.width
    this.tete_de_clown_2.height = window.innerHeight/this.height
    this.app.stage.addChild(this.tete_de_clown_2); //Let's see 
  }

  loadBackground() {
    let background_width = window.innerWidth / this.width;
    let background_height = window.innerHeight / this.height;
    this.map = new PIXI.Container();
    for(let i = 0; i < background_width; i++) {
      for(let j = 0; j < background_height; j++) {
        this.background = new this.Sprite(this.resources["/assets/episode_first_bg.png"].texture);
        this.background.width = background_width
        this.background.height = background_height
        this.background.x = i*(background_width) 
        this.background.y = j*(background_height)
        this.map.addChild(this.background)
      }
    }
    this.app.stage.addChild(this.map)
  }

  setKeys() {
    let that = this;
    this.z = Keyboard("z")
    this.q = Keyboard("q")
    this.s = Keyboard("s")
    this.d = Keyboard("d")

    this.handleLeftRight()
    this.handleUpBottom()
  }

  handleLeftRight() {
    this.q.press = () => {
      this.tete_de_clown_1.vx = -this.speed.x;
      console.log("Q pressed")
    }
    this.q.release = () => {
      if (!this.d.isDown) 
        this.tete_de_clown_1.vx = 0;
      else
        this.tete_de_clown_1.vx = this.speed.x;  
      console.log('Q released')
    };

    this.d.press = () => {
      this.tete_de_clown_1.vx = this.speed.x;
      console.log("D pressed")
    }
    this.d.release = () => {
      if (!this.q.isDown) 
        this.tete_de_clown_1.vx = 0;
      else
        this.tete_de_clown_1.vx = -this.speed.x;  
      console.log('D released')
    };
  }

  handleUpBottom() {
    this.z.press = () => {
      this.tete_de_clown_1.vy = -this.speed.y;
      console.log("Z pressed")
    }
    this.z.release = () => {
      if (!this.s.isDown) 
        this.tete_de_clown_1.vy = 0;
      else
        this.tete_de_clown_1.vy = this.speed.y;  
      console.log('Z released')
    };

    this.s.press = () => {
      this.tete_de_clown_1.vy = this.speed.y;
      console.log("S pressed")
    }
    this.s.release = () => {
      if (!this.z.isDown) 
        this.tete_de_clown_1.vy = 0;
      else
        this.tete_de_clown_1.vy = -this.speed.y;  
      console.log('D released')
    };
  }

  gameLoop(delta) {
    this.state(delta) 
  }

  play(delta) {
    this.movePlayer1()
    this.stopPlayerOnCase()
    // this.movePlayer2()
  }

  movePlayer1() {
    this.tete_de_clown_1.x += this.tete_de_clown_1.vx;
    this.tete_de_clown_1.y += this.tete_de_clown_1.vy;
    this.contain(this.tete_de_clown_1, this.map)
  }
  movePlayer2() {
    this.tete_de_clown_2.x += this.tete_de_clown_2.vx;
    this.tete_de_clown_2.y += this.tete_de_clown_2.vy;
  }
  
  contain(player, container) {
    let collision = contain(player, container);
    if(collision === "left" || collision === "right")
      this.tete_de_clown_1.vx = 0
    if(collision === "top" || collision === "bottom")
      this.tete_de_clown_1.vy = 0
  }
  stopPlayerOnCase() {
    console.log(this.tete_de_clown_1.x)
  }
}
