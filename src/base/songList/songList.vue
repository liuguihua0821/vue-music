<template>
    <div class="song-list">
      <div v-for="(song,index) in songs" class="song-group" @click="setSong(song,index)">
         <div class="rank" v-show="showRank">
            <span :class="getRankCls(index)" v-text="getRankText(index)"></span>
         </div>
         <div class="content">
           <div class="song-name">{{song.name}}</div>
           <div class="song-desc">{{song.singer}} - {{song.album}}</div>
         </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "song-list",
      props:{
          showRank:{
            type:Boolean,
            default:false
          },
          songs:{
            type:Array,
            default:[]
          },
      },
      methods:{
        /**
         * 判断是否显示排行杯
         * @param index
         * @return {string}
         */
        getRankCls(index){
          if(index < 3){
             return `rank-icon icon${index}`
          }else{
            return 'text'
          }
        },
        /**
         * 显示排名值
         * @param index
         * @return {*}
         */
        getRankText(index){
          if(index > 2){
            return index + 1;
          }else{
            return ''
          }
        },
        /**
         * 点击派发 播放音乐
         */
        setSong(item,index){
          this.$emit("setSong",item,index)
        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
  .song-group
    display flex
    height 4rem
    margin 0.5rem 0
    .rank
      width 4rem
      height 4rem
      align-items center
      display flex
      justify-content center
      .rank-icon
         width 3rem
         height 3rem
         display inline-block
         margin 0.5rem
         bg-image()
         &.icon0
            background-image url("first@2x.png")
         &.icon1
            background-image url("second@2x.png")
         &.icon2
            background-image url("third@2x.png")
      .text
         color $color-theme-h
         font-size $font-size-large-x
         text-align center
    .content
      display flex
      flex-direction column
      justify-content space-around
      margin-left 1rem
      .song-name
         color $color-theme
         font-size $font-size-medium-x
      .song-desc
         color $color-theme-l
</style>
