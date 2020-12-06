
const { pixelRatio, windowWidth, windowHeight } = wx.getSystemInfoSync();

var config = {
   size: {
      width: 400,
      height: 800,
   }
}

config.init = function () {
   var { width, height } = config.size;
   var w = windowWidth;
   var h = windowHeight;
   var x = 0;
   var y = 0;
   if (windowHeight / windowWidth > height / width) {
      h = w / width * height;
      y = (windowHeight - h) * 0.5;
   } else {
      w = h / height * width;
      x = (windowWidth - w) * 0.5;
   }
   config.mainSize = { x, y, width: w, height: h };
}
config.init();
export default config;