import Block from "./Block";

export default class BlockLayer {
   constructor() {
      this.blocks = [];
   }
   init(parent, x, y) {
      var container = this.container = new PIXI.Container();
      container.x = x;
      container.y = y;
      parent.addChild(container);
      for (var i = 0; i < 8; i++) {
         for (var j = 0; j < 8; j++) {
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