import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: '',
  voiceId: '',
  inVoice: false,
  isMuted: false,
  isDeafened: false,
  localStream: null
}

export const voiceSlice = createSlice({
  name: "voice",
  initialState,
  reducers: {
    updateVoice: (state, action) => {
      state.id = action.payload.id
      state.voiceId = action.payload.voiceId
      state.inVoice = action.payload.inVoice
      state.isMuted = action.payload.isMuted
      state.isDeafened = action.payload.isDeafened
      state.localStream = action.payload.localStream
    }
  }
})

export const { updateVoice } = voiceSlice.actions

export const selectVoice = (state: any) => state.voice

export default voiceSlice.reducer