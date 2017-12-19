import Vue from 'vue';
import Router from 'vue-router';

import Home from '../pages/Home/home.vue';
import Live from '../pages/Live/live.vue';
import PayBalance from '../pages/PayBalance/paybalance.vue';
import Personal from '../pages/Personal/personal.vue';
import Recommend from '../pages/Home/Recommend.vue';
import Classify from '../pages/Home/Classify.vue';
import Radio from '../pages/Home/Radio.vue';
import Tv from '../pages/Home/tv.vue';
import TopicNews from '../pages/Home/TopicNews.vue';
import Information from '../pages/Home/information.vue';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path:'/',
      name:'Home',
      component:Home,
      children:[
        {path:'/',component:Recommend}
      ]
    },
    {
      path:'/home',
      name:'Home',
      component:Home,
      children:[
        {path:'/',component:Recommend},
        {path:'recommend',component:Recommend},
        {path:'classify',component:Classify},
        {path:'radio',component:Radio},
        {path:'tv',component:Tv},
        {path:'topicnews',component:TopicNews},
        {path:'information',component:Information}
      ]
    },
    {
      path:'/live',
      name:'Live',
      component:Live
    },
    {
      path:'/paybalance',
      name:'PayBalance',
      component:PayBalance
    },
    {
      path:'/personal',
      name:'Personal',
      component:Personal
    }
  ]
})
