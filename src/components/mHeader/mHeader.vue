<template>
    <div class="m-header">
      <div class="logo">
      <img src="static/mHeader/logo.png"/>
        <span>Chicken Music</span>
      </div>
      <i class="icon icon-mine"></i>
    </div>
</template>

<script>
    export default {
        name: "m-header"
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
  .m-header
     position relative
     display flex
     height 2.5rem
     justify-content center
     background-color $color-background
    .logo
      display flex
      align-items center
      color $color-theme-h
      font-size $font-size-medium-x
      img
        height 2rem
        margin-right 0.5rem
    .icon
      position absolute
      right 1rem
      font-size $font-size-large
      color $color-theme-h
      line-height 2.5rem
</style>
