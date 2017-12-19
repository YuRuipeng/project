# rc

> this is app item

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

---------------
### 目录说明

```
|--src
|---assets
|------|-img                              静态图片资源
|------|-lib                              外部库文件
|---components                          组件库
|------|-Grid                             分类组件
|--------|-recommendGrid.vue
|------|-List                             列表组件
|--------|-ActiveTopic.vue                推荐-最新活动,热门话题组件
|--------|-Anchor.vue                     推荐-推荐主播列表组件
|--------|-LiveBroadcast.vue              推荐-正在直播列表组件
|------|-Nav                              导航组件
|--------|-recommendNav.vue
|------|-Slider                           轮播图组件
|--------|-recommendSlider.vue
|------|-Title                            标题组件
|--------|-recommendTitle.vue
|------|-Item.vue                         底部导航子组件
|------|-Tabbar.vue                       底部导航父组件
|---pages                               页面组件
|------|-Home
|--------|-home.vue                       父组件：主页
|--------|-Recommend.vue                  子组件：推荐页
|--------|-Classify.vue                   子组件：分类页
|--------|-Radio.vue                      子组件：电台页
|--------|-tv.vue                         子组件：电视页
|--------|-TopicNews.vue                  子组件：头条页
|--------|-information.vue                子组件：资讯页
|------|-Live
|--------|-live.vue                       直播组件
|------|-PayBalance
|--------|-paybalance.vue                 花余额组件
|------|-Personal
|--------|-personal.vue                   个人中心组件
|---router
|------|-index.js                         路由配置文件
|---App.vue                             入口页面组件
|---main.js                             入口js配置文件
```
