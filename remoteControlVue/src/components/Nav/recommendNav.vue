<template>
  <div class="navContentWrapper">
    <ul class="recommendNavWrapper">
      <li :class="{active:nowIndex==0}"  @click="nowIndex=0"><router-link to="/home/recommend">推荐</router-link><em></em></li>
      <li :class="{active:nowIndex==1}"  @click="nowIndex=1"><router-link to="/home/classify">分类</router-link><em></em></li>
      <li :class="{active:nowIndex==2}"  @click="nowIndex=2"><router-link to="/home/radio">电台</router-link><em></em></li>
      <li :class="{active:nowIndex==3}"  @click="nowIndex=3"><router-link to="/home/tv">电视</router-link><em></em></li>
      <li :class="{active:nowIndex==4}"  @click="nowIndex=4"><router-link to="/home/topicnews">头条</router-link><em></em></li>
      <li :class="{active:nowIndex==5}"  @click="nowIndex=5"><router-link to="/home/information">资讯</router-link><em></em></li>
    </ul>
    <router-view></router-view>
  </div>

</template>
<script>
  export default {
    data(){
        return{
          nowIndex:0
        }
    }
  }
</script>
<style>

  .recommendNavWrapper{
    width: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    padding: 10px 0;
  }
  .recommendNavWrapper  li{
    flex: 1;
    font-size: 14px;
    color: #333;
    position: relative;
  }
  .recommendNavWrapper  li.active em{
    display: inline-block;
    width: 35px;
    height: 2px;
    background-color: #fe6732;
    border-bottom: 2px solid #fe6732;
    position: absolute;
    left:50%;
    margin-left: -17.5px;
    bottom: -10px;
  }
</style>
