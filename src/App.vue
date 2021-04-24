<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" ></router-view>
    <play></play>
  </div>
</template>

<script>
import Tab from "./components/tab/tab";
import MHeader from "./components/mHeader/mHeader";
import Play from "./components/play/play";

export default {
  components: {
    Play,
    MHeader,
    Tab
  },
  name: 'App'
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
</style>

