var gulp = require("gulp");
var uglify = require('gulp-uglify');//混淆js
var concat = require("gulp-concat");
var rename = require("gulp-rename");
var clean = require('gulp-clean')
var replace = require("gulp-replace");
var htmlmin = require('gulp-htmlmin');
var optimisejs = require('gulp-optimize-js');
var through = require('through2');
var argv = require('yargs').argv;
var merge2 = require("merge2");
var pako = require('pako');
var jsImport = require('gulp-js-import');
const webpackStream = require('webpack-stream');
var fs = require('fs');
var path = require('path');

// var runSequence = require('run-sequence');
// var srcToVariable = require("gulp-content-to-variable");
// var addModuleExports = require("./gulp-addModuleExports");
// var uncommentShader = require("./gulp-removeShaderComments");

// var gutil = require('gulp-util');
// var PluginError = gutil.PluginError;
// var File = gutil.File;

// var buildModule = ["drogon"];
// var bootFile = "bootFile";
// var extendsSearchRegex = /var\s__extends[\s\S]+?\};/g;
// var decorateSearchRegex = /var\s__decorate[\s\S]+?\};/g;

function CurentTime() {
   var now = new Date();
   var year = now.getFullYear();       //年
   var month = now.getMonth() + 1;     //月
   if (month < 10) month = "0" + month;
   var day = now.getDate();            //日
   if (day < 10) day = "0" + day;
   var hh = now.getHours();            //时
   if (hh < 10) hh = "0" + hh;
   var mm = now.getMinutes();          //分
   if (mm < 10) mm = "0" + mm;
   var ss = now.getSeconds();            //秒
   if (ss < 10) ss = "0" + ss;

   return "" + year + month + day + hh + mm + ss;
}

var jsAddedCache = {};
function getFileListOfModule(moduleMap, moduleName, ext, dir) {
   if (jsAddedCache[moduleName]) return null;
   dir = dir || "";
   var jsList = [];
   var tempList = moduleMap[moduleName];
   if (!tempList) throw "can not find module [" + moduleName + "]";
   for (var i = 0, li = tempList.length; i < li; i++) {
      var item = tempList[i];
      if (jsAddedCache[item]) continue;
      var extname = path.extname(item);
      if (!extname) {
         var arr = getFileListOfModule(moduleMap, item, ext, dir);
         if (arr) jsList = jsList.concat(arr);
      }
      else if (extname.toLowerCase() === ext) {
         //console.log(path.join(dir, item));
         jsList.push(path.join(dir, item));
      }
      jsAddedCache[item] = 1;
   }
   return jsList;
}

// some build option
var project_dir = path.resolve("./");
var lib_dir = path.join(project_dir, "libs");
var project_name = path.basename(project_dir);
var build_dir = path.join(project_dir, "build");
var publish_dir = path.join(project_dir, "publish/" + project_name);
var publish_res = path.join(publish_dir, "res");
var res_dir;
var USE_LOADER = argv.p ? true : false;
var gameMinJsName = "game.min." + CurentTime() + ".js";
if (USE_LOADER)
   gameMinJsName += "zip";
// 打包微信小游戏
if (argv.w) {
   gameMinJsName = "game.min.js";
}

// console.log("project_dir:", project_dir);
console.log("build_dir:", build_dir);
console.log("publish_dir:", publish_dir);

//compress code
var compressCode = function () {
   function compress(file, encoding, cb) {
      if (!USE_LOADER) {
         return cb(null, file);
      }
      else {
         var content = String(file.contents);
         content = pako.deflate(content, { to: "string" });
      }
      file.contents = new Buffer(content);
      this.push(file);
      cb(null, file);
   }
   return through.obj(compress);
};

gulp.task("project_clean", function () {
   return gulp.src(publish_dir + "/*", { read: false })
      .pipe(clean({ force: true }));
});
gulp.task("project_res", ["project_clean"], function () {
   return gulp.src(['openDataContext/**', 'libs/**', 'res/**', 'game.js', 'game.json', 'project.config.json'], { base: './' })
      .pipe(gulp.dest(publish_dir));
});
// gulp.task("compileProject", ["project_res"], function () {
//    jsAddedCache = {};
//    var jsList = [];
//    //game js...
//    var gameJsList = [];
//    var mainJs = "game.js";
//    gameJsList.push(path.join(project_dir, mainJs));
//    jsList = jsList.concat(gameJsList);
//    // console.log(jsList);
//    console.log("Compiling " + jsList.length + " .js files...");
//    return merge2(gulp.src(jsList))
//       .pipe(concat(gameMinJsName))
//       .pipe(uglify())
//       .pipe(optimisejs())
//       .pipe(compressCode())
//       .pipe(gulp.dest(publish_dir))
// });
gulp.task('build', ['project_res'], function () {
   return gulp.src('./src/Application.js')
      .pipe(webpackStream({
         mode: 'production',
         output: {
            filename: 'app.js'
         },
         // plugins:[
         //    new webpack.optimize.SplitChunksPlugin({
         //       name: 'vendor',  // 这里是把入口文件所有公共组件都合并到 vendor模块当中
         //       chunks: "initial",
         //       filename: '[name].js'
         //     })
         // ],
         module: {
            rules: [
               {
                  test: /\.js$/, //需要编译的文件
                  exclude: [
                     /node_modules/, //排除 node_modules目录
                     /libs/
                  ],
                  use: {
                     loader: "babel-loader", //loader名称
                     options: {	//配置
                        presets: ['@babel/preset-env'], //预设
                        plugins: ['@babel/plugin-proposal-class-properties']//插件
                     }
                  }
               }
            ]
         }
      }))
      .pipe(uglify())
      .pipe(optimisejs())
      .pipe(gulp.dest(publish_dir));
});

gulp.task('help', function () {
   console.log('   gulp help           gulp参数说明');
   console.log('   -p 使用pako压缩代码');
});

gulp.task('default', function () {
   gulp.start('build');
});