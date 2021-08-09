import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: '',
  name: '',
  color: ''
}

export const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    updateRole: (state, action) => {
      state.id = action.payload.id || state.id
      state.name = action.payload.name || state.name
      state.color = action.payload.color || state.color
    }
  }
})

export const { updateRole } = roleSlice.actions

export const selectRole = (state: any) => state.role

export default roleSlice.reducer