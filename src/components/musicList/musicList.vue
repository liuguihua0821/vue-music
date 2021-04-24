<template>
    <div class="music-list">
       <div class="bgImg" :style="bgStyle">
          <div class="back" @click="back"><i class="icon icon-back"></i> </div>
          <div class="title">{{title}}</div>
          <div class="randon-play">
            <span class="bar">
                <i class="icon icon-play"></i>
                <span class="text">随机播放全部</span>
            </span>
          </div>
       </div>
       <scroll :data="songs" class="song-scroll">
       <song-list :songs="songs" @setSong="setSong"></song-list>
      </scroll>
    </div>
</template>

<script>
    import Scroll from "../../base/scroll/scroll";
    import SongList from "../../base/songList/songList";
    import {mapActions} from "vuex"
    export default {
      components: {
        SongList,
        Scroll
      },
      name: "music-list",
      props:{
        bgImage:{
          type:String,
          default:'/static/recom-title1.jpg'
        },
        title:{
          type:String,
          default:''
        },
        songs:{
          type:Array,
          default:[]
        },
      },
      created(){
      },
        computed: {

          bgStyle() {
            return `background-image:url(${this.bgImage})`
          }
        },
      methods:{
        back(){
          this.$emit("back")
        },
        /**
         * 点击 播放音乐
         */
        setSong(item,index){
          this.selectPlay({
            list:this.songs,
            index
          })
        },
        ...mapActions([
          'selectPlay'
        ])
      },
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
@import "~common/stylus/mixin"
  .music-list
   position fixed
   top 0
   z-index $z-index-h1
   width 100%
   height 100%
   color $color-theme
   background-color $color-background
   .bgImg
     width 100%
     height 15rem
     position relative
     /*opacity 0.7*/
     z-index $z-index-h2
     bg-image()
     .back
        position absolute
        top 0.5rem
        left 0.5rem
        z-index $z-index-h2-h
       .icon-back
          font-size $font-size-large
     .title
       position absolute
       top 0.5rem
       width 100%
       text-align center
       color $color-theme-h
       font-size $font-size-large
     .randon-play
       position absolute
       bottom 1.5rem
       width 100%
       text-align center
       .bar
         border 1px solid $color-theme-h
         padding 0.5rem 1rem
         border-radius 1.2rem
         align-items center
         font-size $font-size-medium-x
         color $color-theme-h
   .icon
     color $color-theme-h
   .song-scroll
     position fixed
     top 15.5rem
     width 100%
     bottom 0rem
</style>
