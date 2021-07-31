import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../reducers/user'
import serverReducer from '../reducers/server'
import voiceReducer from '../reducers/voice'
import channelReducer from '../reducers/channel'

const store = configureStore({
  reducer: {
    user: userReducer,
    server: serverReducer, 
    channel: channelReducer,
    voice: voiceReducer
  }
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch