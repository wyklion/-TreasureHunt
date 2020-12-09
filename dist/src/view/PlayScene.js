
import Scene from "./Scene";
import BlockLayer from "./BlockLayer";
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
      startBtn.y = 220;
      startBtn.scale.set(1);
      startBtn.interactive = true;
      startBtn.on('pointerdown', (event) => {
         var position = event.data.getLocalPosition(this.context.app.stage);
         console.log('click back', position.x, position.y);
         sounds.play('bomb');
         this.context.canvas.switchScene(1);
      });
      this.stage.addChild(startBtn);
      this.createBlockLayer();
      // sounds.playMusic('bg1');
   }
   startGame() {

   }
   createBlockLayer() {
      var layer = this.blockLayer = new BlockLayer();
      layer.init(this.stage, 11, 50);
   }
   dispose() {
      sounds.stop();
      this.blockLayer.dispose();
      this.bg.destroy();
      this.startBtn.destroy();
   }
}
