import * as types from './mutation-type'
import {shuffle} from "../common/js/util";
import {playMode} from "../common/js/config";

function findIndex(list,song) {
  return list.findIndex((item) =>{
    return item.id == song.id;
  })
}

export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST,list);
  if(state.mode == playMode.random ){
    let newList = shuffle(list);
    commit(types.SET_PLAY_LIST,newList);
    index = findIndex(newList,list[index]);
  }else{
    commit(types.SET_PLAY_LIST,list)
  }
  commit(types.SET_CURRENT_INDEX,index);
  commit(types.SET_PLAYING_STATE,true);
  commit(types.SET_FULL_SCREEN,true);
}
