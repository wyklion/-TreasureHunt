import config from "../config/config";
import Block from "./Block";

export default class BlockLayer {
   constructor() {
      this.blocks = [];
   }
   init(parent, x, y) {
      var num = config.blockNum;
      var container = this.container = new PIXI.Container();
      container.x = x;
      container.y = y;
      parent.addChild(container);
      for (var i = 0; i < num; i++) {
         for (var j = 0; j < num; j++) {
            var block = new Block();
            block.init(container, i, j);
            this.blocks.push(block);
         }
      }
   }
   dispose() {
      this.blocks.forEach(d => d.dispose());
      this.container.destroy();
   }
}