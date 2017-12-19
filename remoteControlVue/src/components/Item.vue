<template>
  <div class="itemWrapper" @click="send">
    <span v-show="bol"><slot name="activeImg"></slot></span>
    <span v-show="!bol"><slot name="normalImg"></slot></span>
    <slot name="audioImg"></slot>
    <span :class="{active:bol}">{{ txt }}</span>
  </div>
</template>
<script>
  export default{
    computed: {
        bol:function () {
          if(this.mark==this.sel){
            return true;
          }
          return false;
        }
    },
    props: ["txt","mark","sel"],
    methods: {
        send(){
          this.$emit('changedata',this.mark);
          this.$router.push('/'+this.mark);
        }
    },
    beforeCreate(){
      this.$router.push('/');
    }
  }
</script>
<style>
  .itemWrapper {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    color: #333;
  }
  .itemWrapper img{
    display: block;
    width: 21px;
    height: 21px;
    margin: 0 auto;
  }
  .itemWrapper span{
    font-size: 12px;
    color: #333;
    margin-top: 2px;
  }
  .itemWrapper span.active{
    color: #fe6732;
  }
  .itemWrapper img.audioIcon{
    width: 70px;
    height: 70px;
    margin-top: -35px;
  }
</style>
