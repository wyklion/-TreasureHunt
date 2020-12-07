
import * as PIXI from '../libs/pixi.min';
import Canvas from './view/Canvas';
import resources from './config/resources'
import config from './config/config';

const { pixelRatio, windowWidth, windowHeight } = wx.getSystemInfoSync();

export default class Application {
   constructor() {
      this.app = null;
   }

   start() {
      PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
      var app = this.app = new PIXI.Application({
         width: windowWidth * pixelRatio,
         height: windowHeight * pixelRatio,
         view: canvas
      });
      app.renderer.backgroundColor = 0x061639;
      app.renderer.plugins.interaction.mapPositionToPoint = (point, x, y) => {
         point.x = x * pixelRatio
         point.y = y * pixelRatio
      }
      var size = config.mainSize;
      console.log(size);
      // app.stage.width = size.width;
      // app.stage.height = size.height;
      // app.stage.x = size.x;
      // app.stage.y = size.y;
      // app.stage.scale.set(size.scale);
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