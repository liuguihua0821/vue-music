<template>
    <div class="paly">
      <transition name="normal">
          <div class="play-normal" v-show="fullPlay">
            <div class="background">
              <img :src="this.currentSong.image" style="width: 100%;height: 100%"/>
            </div>
            <div class="play-top" >
              <div class="back" @click="back">
                <i class="icon icon-back"></i>
              </div>
              <div>
                <div class="music-title">{{this.currentSong.name}}</div>
                <div class="sub-title">{{this.currentSong.singer}}</div>
              </div>
            </div>
            <div class="play-middle" @click="toggleMiddle">
              <div class="middle-cd" v-show="this.cdFlag">
                 <div class="cd" :class="cdCls">
                   <img :src="this.currentSong.image" style="width: 100%;height: 100%;border-radius: 50%"/>
                 </div>
                 <div class="cd-lyric">
                   我要是看上了什么，那就是人生了
                 </div>
              </div>
              <div class="middle-lyric" v-show="!this.cdFlag">
                <p v-for="i in 20" class="lyric-line">
                  让我掉下眼泪的 不止昨夜的酒
                </p>
              </div>
            </div>
            <div class="paly-bottom">
              <div class="time">
                <div class="time-left">0.00</div>
                <progress-bar class="progressBar"></progress-bar>
                <div class="time-right">4.23</div>
              </div>
              <div class="operate">
                <div class="icon" @click="changeMode"><i :class="iconMode"></i> </div>
                <div class="icon"><i class="icon-prev"></i> </div>
                <div class="icon icon-middle" @click="togglePlay"><i :class="playIcon"></i> </div>
                <div class="icon"><i class="icon-next"></i></div>
                <div class="icon"><i class="icon-favorite"></i></div>
              </div>
            </div>
          </div>
      </transition>
      <div class="play-mini" v-show="!fullPlay" @click="open">
         <div class="mini-left">
           <div class="mini-cd" :class="cdCls">
             <img :src="this.currentSong.image" style="width: 100%;height: 100%;border-radius: 50%"/>
           </div>
           <div class="mini-title">
             <span class="name">{{this.currentSong.name}}</span>
             <span class="singer">{{this.currentSong.singer}}</span>
           </div>
         </div>
         <div class="mini-right">
           <div class="mini-play" @click.stop="togglePlay">
             <i :class="playIconMini"></i>
           </div>
           <div class="mini-list">
             <i class="icon-playlist"></i>
           </div>
         </div>
      </div>
      <audio :src="this.currentSong.url" ref="audio"></audio>
    </div>
</template>

<script>
    import ProgressBar from "../../base/progress/progress-bar";
    import {mapGetters, mapMutations} from "vuex"
    import {playMode} from "../../common/js/config";

    export default {
      components: {ProgressBar},
      name: "play",
      data(){
          return{
            cdFlag:true , // 显示cd 还是歌词
            currentLyric : null , // 当前歌曲的歌词
          }
      },
      computed:{
      ...mapGetters([
          'playing',
          'fullPlay',
          'mode',
          'currentSong'
        ]),
        iconMode(){
         return this.mode == playMode.sequence ? 'icon-sequence': this.mode == playMode.loop ? 'icon-loop': 'icon-random'
        },
        playIcon(){
        return this.playing ? 'icon-pause':'icon-play'
        },
        playIconMini(){
          return this.playing ? 'icon-pause-mini':'icon-play-mini'
        },
        cdCls(){
          return this.playing ? 'play':'pause';
        }
      },
      methods:{
        /**
         * 退出全屏播放页面
         */
        back(){
           this.setFullScreen(false);
        },
        /**
         * 打开全屏播放页面
         */
        open(){
          this.setFullScreen(true);
        },
        /**
         * 切换 cd 与歌词 显示
         */
        toggleMiddle(){
          if(this.cdFlag == true){
            this.cdFlag = false;
          }else{
            this.cdFlag = true;
          }
          console.log(this.cdFlag)
        },
        ...mapMutations({
          setFullScreen: 'SET_FULL_SCREEN',
          setMode:'SET_PLAY_MODE',
          setPlaying:'SET_PLAYING_STATE',
        }),
        /**
         * 切换播放模式
         */
        changeMode(){
          let mode = ( this.mode + 1 ) % 3;
          this.setMode(mode)
        },
        /**
         * 切换暂停播放
         */
        togglePlay(){
          this.setPlaying(! this.playing)
        },
        /**
         * 处理歌词数据
         */
        getLyric(){
          this.currentSong.getLyric().then((lyric) => {
            console.log(lyric)
          })
        },
      },
      watch:{
        currentSong(newSong, oldSong){
          if(! newSong.id){
            return
          }
          if(newSong.id == oldSong.id){
            return
          }
          if(this.currentLyric){
            this.currentLyric.stop();
          }
          this.timer = setTimeout(() => {
            this.$refs.audio.play();
            this.getLyric()
          },1000)
        },
      },
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
  .paly
    .play-normal
      position fixed
      top 0
      width 100%
      height 100%
      z-index $z-index-p
      background-color $color-background
      .background
        position fixed
        width 100%
        height 100%
        top 0
        opacity 0.6
        filter blur(15px)
      .play-top
         position relative
         width 100%
         margin-top  0.8rem
         display flex
         align-items center
         justify-content center
         .back
           position absolute
           left 1rem
           top 0
           .icon-back
              font-size $font-size-large
              display block
              color $color-theme-h
              transform rotate(-90deg)
         .music-title
           color $color-theme
           font-size $font-size-medium-x
         .sub-title
           color $color-theme-l
           margin-top 0.5rem
      .play-middle
        position relative
        height 62%
        width 100%
        padding-top 2rem
        overflow hidden
        .middle-cd
          display flex
          flex-direction column
          align-items center
          .cd
             width 20rem
             height 20rem
             border-radius 50%
             border 10px solid rgba(188, 188, 188, 0.35)
             &.play
               animation rotate 20s linear infinite
             &.pause
               animation-play-state paused
          .cd-lyric
             margin-top 2rem
             color $color-theme
        .middle-lyric
          text-align center
          overflow hidden
          .lyric-line
             margin 1rem 0
      .paly-bottom
        position absolute
        bottom 3rem
        width 100%
        display flex
        flex-direction column
        align-items center
        .time
          width 90%
          display flex
          align-items center
          justify-content space-between
          margin-bottom 2rem
          .progressBar
            width 80%
        .operate
          width 100%
          display flex
          justify-content space-around
          align-items center
          .icon
             color $color-theme-h
             font-size $font-size-large-b
            .icon-middle
               font-size 2.6rem
    .play-mini
      position fixed
      height 4rem
      width 100%
      bottom 0
      background-color $color-theme-h
      z-index $z-index-p
      display flex
      justify-content space-between
      color $color-theme
      .mini-left
        display flex
        align-items center
        .mini-cd
          width 3rem
          height 3rem
          margin-left 1rem
          &.play
            animation rotate 3s linear infinite
        .mini-title
          display flex
          flex-direction column
          justify-content center
          margin-left 1rem
          .singer
             color $color-theme-l
             font-size $font-size-small
             margin-top 0.5rem
      .mini-right
        display flex
        align-items center
        font-size $font-size-large-b
        .icon-playlist
           font-size $font-size-large-b
           margin 0 1rem
  .normal-enter-active
     animation playEnter 0.15s linear
  .normal-leave-to
     animation playEnter 0.15s linear reverse
  @keyframes rotate
    0%
      transform rotate(0deg)
    100%
      transform rotate(360deg)
  @keyframes playEnter
     0%
       transform translateY(100%)
     50%
       transform translateY(50%)
     100%
       transform translateY(0%)
</style>
