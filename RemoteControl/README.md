## 遥控器
> 前端方面

### 1.技术选型
  + 前台框架 [ydui](http://www.ydui.org/docs),使用其可定制的特性,方便开发,此次开发采用**px**移动端解决方案
  + 前端自动化工具 [gulp](http://www.gulpjs.com.cn/),目前使用的功能包括：less编译,浏览器自动刷新,autoprefixer处理css3浏览器前缀,css合并和压缩,base64图片处理
  + css预编译语言 [less](http://lesscss.cn/)
  + 移动端轮播及触摸滚动插件 [swiper](http://www.swiper.com.cn/)
  + Js库 - [Jquery](http://jquery.com/)
  + 代码存放,测试地址 [码云](https://gitee.com/tvplaza/CeShi)
  
### 2.文件说明
  ```
  |-RemoteControl                           项目前端目录-遥控器
  |--build                                  正式环境
  |---|-css                                  编译后(合并后)css文件
  |---|-js                                   编译后(合并后)js文件
  |--lib                                    外部库文件
  |--src                                    开发环境
  |---|-less                                 项目开发时的less文件
  |---|-js                                   项目开发时的js文件
  |--view                                   页面目录
  |--.gitignore                             git配置文件
  |--gulpfile.js                            gulp配置文件
  |--index.html                             项目入口文件(首页)
  |--package.json                           项目依赖文件
  |--README.md                              项目须知
```