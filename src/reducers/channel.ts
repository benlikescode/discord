import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: '',
  name: ''
}

export const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    updateChannel: (state, action) => {
      state.id = action.payload.id
      state.name = action.payload.name
    }
  }
})

export const { updateChannel } = channelSlice.actions

export const selectChannel = (state: any) => state.channel

export default channelSlice.reducer