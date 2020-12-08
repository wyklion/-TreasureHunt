import resources from "../config/resource"

class Sounds {
   constructor() {
      this.sounds = {};
      this.count = 0;
      this.music = null;
   }
   load(callback) {
      var count = 0;
      for (let i in resources.sounds) { count++; }
      for (let i in resources.sounds) {
         var audio = wx.createInnerAudioContext();
         audio.src = resources.sounds[i];
         this.sounds[i] = audio;
         // audio.onCanPlay(() => {
         //    this.sounds[i] = audio;
         //    count--;
         //    if (count == 0) {
         //       callback();
         //    }
         // })
         count++;
      }
   }
   play(name) {
      var s = this.sounds[name];
      if (!s) return;
      if (!s.paused) s.stop();
      console.log('play', s);
      s.play();
   }
   playMusic(name) {
      var s = this.sounds[name];
      if (s && this.music == s) {
         if (s.paused) s.play();
      } else {
         this.stop();
         if (!s) return;
         s.loop = true;
         s.play();
         this.music = s;
      }
   }
   pause() {
      if (this.music) {
         this.music.pause();
      }
   }
   stop() {
      if (this.music) {
         this.music.stop();
         this.music = null;
      }
   }
}
if (!Sounds.instance) {
   Sounds.instance = new Sounds();
}
export default Sounds.instance;

