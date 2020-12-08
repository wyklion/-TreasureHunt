
import Scene from "./Scene";
import sounds from "../util/sounds";

export default class PlayScene extends Scene {
   constructor() {
      super();
   }
   init() {
      var bg = this.bg = new PIXI.Sprite(PIXI.loader.resources['bg'].texture);
      bg.width = 150;
      bg.height = 250;
      bg.interactive = true;
      bg.on("pointerdown", (event) => {
         var position = event.data.getLocalPosition(bg);
         console.log(event, position.x, position.y);
      })
      this.stage.addChild(bg);
      // 返回
      var startBtn = this.startBtn = new PIXI.Text('返回', { fontSize: 26 });
      startBtn.anchor.set(0.5, 0.5);
      startBtn.x = 75;
      startBtn.y = 180;
      startBtn.scale.set(1);
      startBtn.interactive = true;
      startBtn.on('pointerdown', (event) => {
         var position = event.data.getLocalPosition(this.context.app.stage);
         console.log('click back', position.x, position.y);
         sounds.play('bomb');
         this.context.canvas.switchScene(1);
      });
      this.stage.addChild(startBtn);
      console.log('main scene init...')
      var bunny = this.bunny = new PIXI.Sprite.fromImage("https://pixijs.io/examples/examples/assets/bunny.png");
      bunny.width = 50;
      bunny.height = 50;
      bunny.y = 60;
      // bunny.scale.set(0.2, 0.2);
      bunny.interactive = true;
      bunny.on("pointerdown", (event) => {
         // console.log(this.context.app);
         var position = event.data.getLocalPosition(this.stage);
         console.log(position.x, position.y);
      })
      this.stage.addChild(bunny);
      sounds.playMusic('bg1');
   }
   dispose() {
      sounds.stop();
      this.bg.destroy();
      this.startBtn.destroy();
      this.bunny.destroy();
   }
}
