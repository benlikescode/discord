import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: '',
  name: '',
  email: '',
  avatar: '',
  status: ''
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.id = action.payload.id
      state.name = action.payload.name
      state.email = action.payload.email || ''
      state.avatar = action.payload.avatar || ''
      state.status = action.payload.status || ''
    },
    logOutUser: state => {
      state.id = ''
      state.status = 'Offline'
    }
  }
})

export const { updateUser, logOutUser } = userSlice.actions

export const selectUser = (state: any) => state.user

export default userSlice.reducer