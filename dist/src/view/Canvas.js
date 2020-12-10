import Application from "../Application";
import config from "../config/config";
import Display from "./Display";
import DisplayContext from "./DisplayContext";
import MainScene from "./MainScene";
import PlayScene from "./PlayScene";

export default class Canvas {
   constructor() {
      this.scene = null;
      this.context = new DisplayContext();
      this.setup();
      this.switchScene(1);
   }
   setup() {
      var { pixelRatio, windowWidth, windowHeight } = wx.getSystemInfoSync();
      var { x, y, width, height, scale } = config.mainSize;
      var context = this.context;
      context.canvas = this;
      var app = context.app = Application.instance.app;
      var bg = this.bg = new PIXI.TilingSprite(PIXI.loader.resources['bg'].texture, 16, 16);
      bg.width = windowWidth;
      bg.height = windowHeight;
      bg.interactive = true;
      bg.on("pointerdown", (event) => {
         var position = event.data.getLocalPosition(bg);
         console.log(event, position.x, position.y);
      })
      bg.scale.set(scale);
      app.stage.addChild(bg);
      var stage = this.stage = new PIXI.Container();
      stage.x = x;
      stage.y = y;
      // stage.width = width;
      // stage.height = height;
      stage.scale.set(scale);
      context.app.stage.addChild(stage);
      context.stage = stage;
   }
   switchScene(s) {
      if (this.scene) {
         this.scene.dispose();
      }
      var scene = null;
      switch (s) {
         case 1:
            scene = new MainScene();
            break;
         case 2:
            scene = new PlayScene();
            break;
         default:
            break;
      }
      this.scene = scene;
      scene.context = this.context;
      scene.setup();
      scene.init();
   }
   update() {
      if (!this.scene) return;
      this.scene.update();
   }
}