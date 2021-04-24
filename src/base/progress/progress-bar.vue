<template>
    <div class="progress-bar" @click="clickProgress" ref="progressBar">
      <div class="inner">
        <div class="progress" ref="progress"></div>
        <div class="pro-btn" ref="progressBtn"
             @touchstart.prevent = "progressTouchStart"
             @touchmove.prevent = "progressTouchMove"
             @touchend = "progressTouchEnd"
        ></div>
      </div>
    </div>
</template>

<script>
import {prefixStyle} from "../../common/js/dom";

const PROGRESSBTNWIDTH = 14;
const transform = prefixStyle("transform");
    export default {
        name: "progress-bar",
        props:{
          percent:{
            type:Number,
            default:0
          }
        },
      created(){
          this.touch = {};
      },
      methods:{
          /**
           * 滑动btn 开始 事件
           */
        progressTouchStart(e){
          this.touch.initiated = true ;
          this.touch.startX = e.touches[0].pageX;
          this.touch.left = this.$refs.progress.clientWidth;
        },
        /**
         * 滑动 btn 触发事件
         */
        progressTouchMove(e){
          if(! this.touch.initiated){
            return
          }
          const deltaX = e.touches[0].pageX - this.touch.startX ;
          const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - PROGRESSBTNWIDTH, Math.max(0, this.touch.left + deltaX))
          this._offset(offsetWidth)
        },
        /**
         * 滑动 btn 结束事件
         */
        progressTouchEnd(){

        },
        /**
         * 点击进度条触发的事件
         * @param e
         */
        clickProgress(e){
          const rect = this.$refs.progressBar.getBoundingClientRect().left;
          let offsetW = e.pageX - rect;
          this._offset(offsetW);
          this._triggerPercent();
        },
        /**
         * 改变进度百分比
         */
        _triggerPercent(){
          const allWidth = this.$refs.progressBar.clientWidth - PROGRESSBTNWIDTH;
          const width = this.$refs.progress.clientWidth;
          const percent = width / allWidth ;
          this.$emit("percentChange",percent);
        },
        /**
         * 设置进度条进度宽度
         * @param width
         * @private
         */
        _offset(width){
         this.$refs.progress.style.width = `${width}px`;
         this.$refs.progressBtn.style[transform] = `translate3d(${width}px,0,0)`
        },
      },
      watch:{
        percent(newPercent){
            if(newPercent > 0 && !this.touch.initiated){
              const allWidth = this.$refs.progressBar.clientWidth - PROGRESSBTNWIDTH;
              const width = allWidth * newPercent ;
              this._offset(width)
            }
          }
      },
    }
</script>

<style scoped>
   .progress-bar{
     position: relative;
     width: 100%;
     height: 4px;
   }
  .inner{
    width: 100%;
    height: 100%;
    background-color: #949494;
  }
  .progress{
    position: absolute;
    background-color: #fc2430;
    /*width: 40%;*/
    height: 100%;
  }
  .pro-btn{
    width: 14px;
    height: 14px;
    background-color:#fc2430 ;
    border-radius: 50%;
    display: inline-block;
    position: absolute;
    top: -5px;
    /*left: 40%;*/
  }
</style>
