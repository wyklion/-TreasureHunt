import Application from "../Application";
import config from "../config/config";
import Display from "./Display";
import DisplayContext from "./DisplayContext";
import MainScene from "./MainScene";

export default class Canvas {
   constructor() {
      this.context = new DisplayContext();
      this.setup();
      this.switchScene(1);
   }
   setup() {
      var context = this.context;
      context.canvas = this;
      context.app = Application.instance.app;
      var { x, y, width, height } = config.mainSize;
      var stage = this.stage = new PIXI.Container();
      stage.x = x;
      stage.y = y;
      stage.width = width;
      stage.height = height;
      context.app.stage.addChild(stage);
      context.stage = stage;
      this.displays = [];
   }
   switchScene(s) {
      switch (s) {
         case 1:
            var scene = new MainScene();
            this.addDisplay(scene);
            break;
         default:
            break;
      }
   }
   addDisplay(d) {
      d.context = this.context;
      d.setup();
      d.init();
      this.displays.push(d);
   }
   removeDisplay(d) {
      var idx = this.displays.indexOf(d);
      this.displays.splice(idx, 1);
   }
   update() {
      for (var i = 0; i < this.displays.length; i++) {
         var d = this.displays[i];
         if (d.dirty) {
            d.update();
            d.dirty = false;
         }
      }
   }
}