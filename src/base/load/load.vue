<template>
    <div class="load">
      <img src="./loading.gif"/>
      <div class="text">{{this.text}}</div>
    </div>
</template>

<script>
    export default {
        name: "load",
      props:{
          text:{
            type:String,
            default:"正在载入..."
          }
      },
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
  .load
    width 100%
    text-align center
    img
      width 2rem
      height 2rem
    .text
      margin-top 0.5rem
      color $color-theme
      font-size $font-size-small
</style>
