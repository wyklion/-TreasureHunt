
import * as PIXI from '../libs/pixi.min';
import Canvas from './view/Canvas';
import resources from './config/resources'

const { pixelRatio, windowWidth, windowHeight } = wx.getSystemInfoSync();

export default class Application {
   constructor() {
      this.app = null;
   }

   start() {

      var app = this.app = new PIXI.Application({
         width: windowWidth,
         height: windowHeight,
         view: canvas
      });
      app.renderer.backgroundColor = 0x061639;
      app.renderer.plugins.interaction.mapPositionToPoint = (point, x, y) => {
         point.x = x
         point.y = y
      }
      for (let i in resources) {
         let str = window.REMOTE_SERVER_ROOT + resources[i];
         console.log('加载' + str);
         PIXI.loader.add(i, str);
      }
      PIXI.loader.load((loader, res) => {
         window.resouces = res;
         console.log('资源加载完毕', PIXI.loader.resources);
         this.onStart();
      });
   }
   onStart = () => {
      var canvas = new Canvas();
      var app = this.app;
      var _ticker = new PIXI.ticker.Ticker();
      _ticker.add((dt) => {
         app.render(app.stage);
         canvas.update(dt);
      });
      _ticker.start();
   }

}
Application.instance = new Application();