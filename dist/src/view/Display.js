
export default class Display {
   constructor() {
      this.context = null;
      this.stage = null;
      this.dirty = true;
   }
   setup() {
      this.stage = this.context.stage;
   }
}