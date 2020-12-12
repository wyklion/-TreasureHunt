import config from '../config/config';

export default class Block {
   constructor() {
      this.state = 1;
   }
   init(parent, i, j) {
      this.x = j;
      this.y = i;
      this.idx = i * config.blockNum + j;
      var block = this.sprite = new PIXI.Sprite(PIXI.loader.resources['blueBlock'].texture);
      block.interactive = true;
      block.x = j * config.blockSize;
      block.y = i * config.blockSize;
      parent.addChild(block);
      block.on('pointerdown', this.onClick);
   }
   onClick = () => {
      if (this.state != 1) return;
      console.log('click block', this.idx, this.y, this.x,);
      this.state = 0;
      this.sprite.texture = PIXI.loader.resources['blockBg'].texture;
   }
   dispose() {
      this.sprite.destroy();
   }
}