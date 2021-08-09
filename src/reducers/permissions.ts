import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  viewChannels: true,
  sendMessages: true,
  createInvite: true,
  manageChannels: true,
  viewAuditLog: true,
  kickMembers: false,
  banMembers: false
}

export const permissionsSlice = createSlice({
  name: "permissions",
  initialState,
  reducers: {
    updatePermissions: (state, action) => {
      state.viewChannels = action.payload.viewChannels || state.viewChannels
      state.sendMessages = action.payload.sendMessages || state.sendMessages
      state.createInvite = action.payload.createInvite || state.createInvite
      state.manageChannels = action.payload.manageChannels || state.manageChannels
      state.viewAuditLog = action.payload.viewAuditLog || state.viewAuditLog
      state.kickMembers = action.payload.kickMembers || state.kickMembers
      state.banMembers = action.payload.banMembers || state.banMembers
    }
  }
})

export const { updatePermissions } = permissionsSlice.actions

export const selectPermissions = (state: any) => state.permissions

export default permissionsSlice.reducer