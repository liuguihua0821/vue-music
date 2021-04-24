
export const singer = state => state.singer;

export const disc = state => state.disc;

export const playing = state => state.playing;

export const fullPlay = state => state.fullPlay;

export const sequenceList = state => state.sequenceList

export const playList = state => state.playList

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

export const currentSong = (state) => {
  return state.playList[state.currentIndex] || {}
}
