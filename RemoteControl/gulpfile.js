var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;//页面强制刷新
var notify = require("gulp-notify");//提示
var less = require('gulp-less');//less
var concat = require('gulp-concat');//css合并
var cleanCSS = require('gulp-clean-css');//css压缩
var rev = require('gulp-rev');//版本控制
var revCollector=require('gulp-rev-collector');
var base64=require('gulp-base64');
var autoprefixer = require('gulp-autoprefixer');//处理css浏览器前缀
//var imagemin = require('gulp-imagemin');//处理压缩图片。

gulp.task('default', function () {
    //运行gulp,执行这里面的代码
});
//-----------------------版本控制--------------------------------


/*清理文件    npm install gulp-clear --save-dev*/
// gulp.task('clean',function () {                     //删除dist目录下的所有文件
//     gulp.src('dist/*',{read:false})
//         .pipe(clean());
// });


/*压缩js文件，并生成md5后缀的js文件*/
gulp.task('compress-js',function (callback) {       //- 创建一个名为compress-js的task
    gulp.src(['./js/*.js'])             //- 需要处理的js文件，放到一个字符串数组里
    //.pipe(uglify())                             //- 压缩文件
        .pipe(rev())                                //- 文件名加MD5后缀
        .pipe(gulp.dest('dist/js'))                 //- 另存压缩后的文件
        .pipe(rev.manifest())                       //- 生成一个rev-manifest.json
        .pipe(gulp.dest('rev-js'))                  //- 将rev-manifest.json保存到 rev-js 目录内
        .on('end',function () {
            console.log('compress-js has been completed');
            callback();
        });
});

/*压缩css文件，并生成md5后缀的css文件*/
gulp.task('compress-css', function(callback) {      //- 创建一个名为compress-css的task
    gulp.src(['./css/*.css'])           //- 需要处理的css文件，放到一个字符串数组里
    // .pipe(concat('css/wap.min.css'))         //- 合并后的文件名
    //.pipe(minifyCss())                          //- 压缩处理成一行
        .pipe(rev())                                //- 文件名加MD5后缀
        .pipe(gulp.dest('dist/css'))                //- 输出文件到dist/css目录下
        .pipe(rev.manifest())                       //- 生成一个rev-manifest.json
        .pipe(gulp.dest('rev-css'))                 //- 将rev-manifest.json保存到rev-css目录内
        .on('end',function () {
            console.log('compress-css has been completed');
            callback();
        });
});

/*修改html文件的link标签和script标签引用的css和js文件名，并把html文件输出到指定的位置*/
gulp.task('rev-html',['compress-css','compress-js'], function() {          //- compress-css和compress-js任务执行完毕再执行rev-index任务
    /*修改index.html文件的link标签和script标签引用的css和js文件名，并把html文件输出到指定的位置*/
    gulp.src(['rev-css/*.json','rev-js/*.json', './index.html'])   //- 读取两个rev-manifest.json文件以及需要进行css和js名替换的html文件
        .pipe(revCollector())                                               //- 执行文件内css和js名的替换
        .pipe(gulp.dest('dist/'));                                          //- 替换后的html文件输出的目录

    /*修改其它html文件的link标签和script标签引用的css和js文件名，并把html文件输出到指定的位置*/
    //gulp.src(['rev-css/*.json','rev-js/*.json', 'webContent/views/**/*.html'])     //- 读取两个rev-manifest.json文件以及需要进行css和js名替换的html文件
    //   .pipe(revCollector())                                                      //- 执行文件内css和js名的替换
    //    .pipe(gulp.dest('dist/views'));                                            //- 替换后的html文件输出的目录
});



/*压缩并复制图片 npm install gulp-imagemin --save-dev*/
gulp.task('compress-img',function () {
    gulp.src('./img/*.*')    //原图片的位置
        .pipe(imagemin())                   //执行图片压缩
        .pipe(gulp.dest('dist/images'));    //压缩后的图片输出的位置
});
//--------------------------------------------将css中的图片格式全部转换成base64格式
gulp.task('build', function () {
    return gulp.src('./css/*.html')
        .pipe(base64({
            baseDir: 'public',
            extensions: ['svg', 'png', /\.jpg#datauri$/i],
            exclude:    [/\.server\.(com|net)\/dynamic\//, '--live.jpg'],
            maxImageSize: 8000*1024, // 限制转换的图片大小   8000k以下的都转为base64
            debug: true
        }))
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./public/css'));
});



gulp.task('less', function () {
    gulp.src('./src/less/index.less') //需要编译的文件
        .pipe(less()) //执行less方法,需要安装gulp-less
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            remove:true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(gulp.dest('./build/css')) //最终输出的路径
        .pipe(reload({stream: true})) //自动刷新
        .pipe(notify("success [<%= file.relative %>]")); //任务提示
});
gulp.task('html', function () {
    //监听更改
    gulp.src('**/*.html').pipe(reload({stream: true}))
});

// 静态服务器
gulp.task('server', ['less','html'], function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("src/less/*.less", ['less']); //位置,任务名称
    gulp.watch("./**/*.html", ['html']); //位置,任务名称
});