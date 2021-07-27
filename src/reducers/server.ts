import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: '',
  name: '',
  avatar: '',
}

export const serverSlice = createSlice({
  name: "server",
  initialState,
  reducers: {
    updateServer: (state, action) => {
      state.id = action.payload.id
      state.name = action.payload.name
      state.avatar = action.payload.avatar || '' 
    }
  }
})

export const { updateServer } = serverSlice.actions

export const selectServer = (state: any) => state.server

export default serverSlice.reducer