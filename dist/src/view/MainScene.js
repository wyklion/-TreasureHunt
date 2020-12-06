import config from "../config/config";
import Display from "./Display";

export default class MainScene extends Display {
   constructor() {
      super();
   }
   init() {
      // PIXI.loader
      //    .add("images/anyImage.png")
      //    .load(setup);
      var bg = new PIXI.Sprite(PIXI.loader.resources['bg'].texture);
      bg.width = config.mainSize.width;
      bg.height = config.mainSize.height;
      this.stage.addChild(bg);
      console.log('main scene init...')
      var bunny = new PIXI.Sprite.fromImage("https://pixijs.io/examples/examples/assets/bunny.png");
      bunny.width = 200;
      bunny.height = 200;
      bunny.interactive = true;
      bunny.on("pointerdown", function (event) {
         var position = event.data.getLocalPosition(app.stage);
         console.log(position.x, position.y);
      })
      this.stage.addChild(bunny);
   }
   update() {

   }
}