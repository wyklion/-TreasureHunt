export default class Scene {
   constructor() {
      this.displays = [];
   }
   setup() {
      this.stage = this.context.stage;
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
   dispose() {
      this.displays = null;
   }
} 