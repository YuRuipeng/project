<template>
  <div class="tabbarWrapper">
    <Item txt="首页" mark="home" :sel="selected" @changedata="getVal">
      <img src="../assets/img/home_active.png" alt="" slot="activeImg">
      <img src="../assets/img/home.png" alt="" slot="normalImg">
    </Item>
    <Item txt="直播" mark="live" :sel="selected" @changedata="getVal">
      <img src="../assets/img/live_active.png" alt="" slot="activeImg">
      <img src="../assets/img/live.png" alt="" slot="normalImg">
    </Item>
    <Item>
      <img src="../assets/img/audio.png" alt="" slot="audioImg" class="audioIcon">
    </Item>
    <Item txt="花余额" mark="paybalance" :sel="selected" @changedata="getVal">
      <img src="../assets/img/pay_active.png" alt="" slot="activeImg">
      <img src="../assets/img/pay.png" alt="" slot="normalImg">
    </Item>
    <Item txt="个人中心" mark="personal" :sel="selected" @changedata="getVal">
      <img src="../assets/img/personal_active.png" alt="" slot="activeImg">
      <img src="../assets/img/personal.png" alt="" slot="normalImg">
    </Item>
  </div>
</template>
<script>
  import Item from './Item.vue'
  export default{
    data(){
      return {
        selected: 'home'
      }
    },
    components: {
      Item
    },
    methods: {
      getVal(val){
        this.selected = val;
      }
    }
  }
</script>
<style>
  .tabbarWrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 49;
    width: 100%;
    display: flex;
    display: -webkit-flex;
    display: -ms-flexbox;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 5px 0 3px;
    background-color: rgba(255, 255, 255, .96);
  }
</style>
