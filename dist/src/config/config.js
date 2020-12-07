
const { pixelRatio, windowWidth, windowHeight } = wx.getSystemInfoSync();
var ww = windowWidth * pixelRatio;
var hh = windowHeight * pixelRatio;
var config = {
   size: {
      width: 150,
      height: 250,
   }
}

config.init = function () {
   var { width, height } = config.size;
   var w = ww;
   var h = hh;
   var x = 0;
   var y = 0;
   var scale = 1;
   if (hh / ww > height / width) {
      h = w / width * height;
      y = (hh - h) * 0.5;
      scale = w / width;
   } else {
      w = h / height * width;
      x = (ww - w) * 0.5;
      scale = h / height;
   }
   config.mainSize = { x, y, width: w, height: h, scale };
}
config.init();
export default config;