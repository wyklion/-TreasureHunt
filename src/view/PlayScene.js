
import Scene from "./Scene";
import BlockLayer from "./BlockLayer";
import sounds from "../util/sounds";
import config from "../config/config";

export default class PlayScene extends Scene {
   constructor() {
      super();
   }
   init() {
      // 返回
      var startBtn = this.startBtn = new PIXI.Text('返回', { fontSize: 22, fill: '#5b6ee1', fontWeight: 'bold', strokeThickness: 2 });
      startBtn.anchor.set(0.5, 0.5);
      startBtn.x = config.size.width / 2;
      startBtn.y = config.size.height * 0.9;
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
      var { size, blockSize, blockNum } = config;
      var x = (size.width - blockSize * blockNum) * 0.5;
      var y = 50;
      layer.init(this.stage, x, y);
   }
   dispose() {
      sounds.stop();
      this.blockLayer.dispose();
      this.startBtn.destroy();
   }
}
