import {playMode} from "../common/js/config";

const state = {
  singer: {},
  disc:{},
  playing:false,
  fullPlay:false,
  playList:[],
  sequenceList:[],
  mode:playMode.sequence,
  currentIndex:-1,
}

export default state
