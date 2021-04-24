<template>
  <transition name="disc">
      <music-list @back="back" :bgImage="bgImage" :title="title" :songs="this.songs"></music-list>
  </transition>
</template>

<script>
    import MusicList from "../musicList/musicList";
    import {getSong} from "../../api/recommend";
    import {createSong} from "../../common/js/song";
    import {mapGetters} from "vuex";
    export default {
      components: {MusicList},
      name: "disc",
      data(){
        return{
          songs:[], // 歌曲数据
        }
      },
      created(){
        if(this.$route.params.id){
          this.dissid = this.$route.params.id;
        }
        this._getSongList(this.dissid)
      },
      computed:{
        ...mapGetters([
          'disc'
        ]),
        bgImage(){
          return this.disc.imgurl
        },
        title(){
          return this.disc.dissname
        },
      },
      methods:{
        back(){
          this.$router.back();
        },
        /**
         * 获取歌曲数据
         * @param dissid
         * @private
         */
        _getSongList(dissid){
          getSong(dissid).then((res) => {
            this.songs = this._nomalizeSongs(res.data.list)
          })
        },
        /**
         * 处理歌曲数据
         * @param list
         * @return {Array}
         * @private
         */
        _nomalizeSongs(list){
           let ret = [];
           list.forEach((item) => {
             let {musicData} = item;
             if(musicData.songid && musicData.albummid){
               ret.push(createSong(musicData));
             }
           })
          return ret;
        },
      },
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
    .disc-enter-active
      animation pageEnter 0.2s linear
    .disc-leave-active
      animation pageEnter 0.2s linear reverse
    @keyframes pageEnter
      0% {transform:translateX(100%)}
      50% {transform:translateX(50%)}
      100%{transform:translateX(0%)}
</style>
