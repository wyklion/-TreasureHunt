import config from "../config/config";
import sounds from "../util/sounds";
import Scene from "./Scene";

export default class MainScene extends Scene {
   constructor() {
      super();
   }
   init() {
      // PIXI.loader
      //    .add("images/anyImage.png")
      //    .load(setup);
      var container = this.container = new PIXI.Container();
      this.stage.addChild(container);
      // // var bg = this.bg = new PIXI.Sprite(PIXI.loader.resources['bg'].texture);
      // var bg = this.bg = new PIXI.TilingSprite(PIXI.loader.resources['bg'].texture, 16, 16);
      // bg.width = config.size.width;
      // bg.height = config.size.height;
      // bg.interactive = true;
      // bg.on("pointerdown", (event) => {
      //    var position = event.data.getLocalPosition(bg);
      //    console.log(event, position.x, position.y);
      // })
      // container.addChild(bg);
      // 标题
      var title = this.title = new PIXI.Text('魔塔寻宝', { fontSize: 22, fill: '#3f3f74', fontWeight: 'bold', strokeThickness: 2 });
      title.anchor.set(0.5, 0.5);
      title.x = config.size.width / 2;
      title.y = config.size.height * 0.3;
      title.scale.set(1);
      container.addChild(title);
      // 开始
      var startBtn = this.startBtn = new PIXI.Text('开始', { fontSize: 22, fill: '#639bff', fontWeight: 'bold', strokeThickness: 2 });
      startBtn.anchor.set(0.5, 0.5);
      startBtn.x = config.size.width / 2;
      startBtn.y = config.size.height * 0.7;
      startBtn.scale.set(1);
      startBtn.interactive = true;
      startBtn.on('pointerdown', (event) => {
         var position = event.data.getLocalPosition(container);
         console.log('click start', position.x, position.y);
         sounds.play('bomb');
         this.context.canvas.switchScene(2);
      });
      container.addChild(startBtn);
      // console.log('main scene init...')
      // var bunny = this.bunny = new PIXI.Sprite.fromImage("https://pixijs.io/examples/examples/assets/bunny.png");
      // bunny.width = 50;
      // bunny.height = 50;
      // // bunny.scale.set(0.2, 0.2);
      // bunny.interactive = true;
      // bunny.on("pointerdown", (event) => {
      //    // console.log(this.context.app);
      //    var position = event.data.getLocalPosition(container);
      //    console.log(position.x, position.y);
      // })
      // container.addChild(bunny);
      // sounds.playMusic('bg1');
   }
   dispose() {
      this.container.destroy();
   }
}