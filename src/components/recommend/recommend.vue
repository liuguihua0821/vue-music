<template>
  <div  class="recommend">
      <scroll :data="discList"
              :probeType="this.probeType"
              :listenScroll="this.listenScroll"
              ref="recommendScroll"
              class="recommend-content"
      >
        <div>
          <div class="slider-wrapper" v-show="this.recommends.length > 0">
            <swiper :swiper="this.recommends"  @link="imgLink"></swiper>
          </div>
          <div class="discList">
            <div class="disc-title">热门歌单推荐</div>
            <div v-show="this.discList.length > 0">
              <div v-for="item in this.discList" class="disc-group" @click="selectDisc(item)">
                <img v-lazy="item.imgurl" />
                <div class="disc-item">
                  <div class="name">{{item.creator.name}}</div>
                  <div class="disc">{{item.dissname}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="load-container" v-show="!this.discList.length">
          <load></load>
        </div>
      </scroll>
      <router-view></router-view>
  </div>
</template>

<script>
  import {getRecommend, getDiscList} from "../../api/recommend";
  import {ERR_OK} from "../../api/config";
  import Swiper from "../../base/slider/swiper";
  import Scroll from "../../base/scroll/scroll";
  import Load from "../../base/load/load";
  import {mapMutations} from "vuex";

  export default {
    components: {
      Load,
      Scroll,
      Swiper
    },
    name: "recommend",
      data(){
      return{
        recommends:[] , // slide 推荐数据
        discList:[] , // 推荐歌单数据
      }
      },
      beforeRouteEnter(to, from, next){
        if (from.path == "/disc") {
          to.meta.isBack = true;
        } else {
          to.meta.isBack = false;
        }
        next();
      },
      created(){
         this.probeType = 3;
         this.listenScroll = true;
      },
    activated(){
      if(!this.$route.meta.isBack){
        this._getRecommend();
        this._getDiscList();
        this.$refs.recommendScroll.scrollTo(0,0);
      }
      this.$route.meta.isBack = false;
    },
      methods:{
        loadImage(){
          if(!this.checkedLoad){
            this.checkedLoad = true;
             this.$refs.recommendScroll.refresh();
          }
        },
        selectDisc(item){
          this.$router.push({
            path:'/disc',
            params:{
              "id":item.dissid
            }
          })
          this.setDisc(item)
        },
        /**
         * 滑动图片的链接跳转
         */
        imgLink(url){
          window.location.href = url;
        },
        /**
         * 获取 slide 推荐数据
         * @private
         */
        _getRecommend(){
          getRecommend().then((res) => {
            if(res.code == ERR_OK){
              this.recommends = this.handRecommend(res.data.slider)
            }
          });
        },
        /**
         * 处理 recommend 的数据
         * @param data
         * @return {*}
         */
        handRecommend(data){
          if(!data){
            return null;
          }
          let ret = [];
          for(let i = 0 ; i < data.length; i ++){
            let item = {};
            item.img = data[i].picUrl;
            item.url = data[i].linkUrl;
            ret.push(item);
          }
          return ret;
        },
        _getDiscList(){
          getDiscList().then((res) => {
            if(res.code == ERR_OK){
              this.discList = res.data.list;
            }
          })
        },
        ...mapMutations({
          setDisc:'SET_DISC'
        })
      },
    watch:{
      recommends(){
        this.$refs.recommendScroll.refresh();
      },
      discList(){
        this.$refs.recommendScroll.refresh();
      }
    },
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
.recommend
  background-color $color-background
  color $color-theme
  top 4.5rem
  width 100%
  bottom 0
  position fixed
  overflow hidden
  .recommend-content
    width 100%
    height 100%
    .slider-wrapper
      width 100%
      height 12rem
      position relative
      overflow hidden
    .disc-title
      justify-content center
      height 2rem
      width 100%
      color $color-theme-h
      align-items center
      display flex
    .disc-group
      display flex
      margin 0.8rem
      img
        width 4rem
        height 4rem
      .disc-item
        display flex
        flex-direction column
        justify-content space-around
        margin-left 1rem
        .disc
          color $color-theme-l
    .load-container
      margin-top 20%
</style>
