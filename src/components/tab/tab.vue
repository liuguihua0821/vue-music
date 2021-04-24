<template>
  <div class="tab">
    <router-link tag="div" to="/recommend">
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link tag="div" to="/singer">
      <span  class="tab-link">歌手</span>
    </router-link>
    <router-link tag="div" to="/rank">
      <span  class="tab-link">排行</span>
    </router-link>
    <router-link tag="div" to="/search">
      <span  class="tab-link">搜索</span>
    </router-link>
  </div>
</template>

<script>
    export default {
        name: "tab"
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
.tab
  position relative
  display flex
  justify-content space-around
  color $color-theme
  background-color $color-background
  height 2rem
  align-items  center
  font-size $font-size-medium
  .router-link-active
     .tab-link
       color $color-theme-h
</style>
