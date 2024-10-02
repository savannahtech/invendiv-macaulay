import { configureStore } from '@reduxjs/toolkit'
import { ConfigurationReducer } from './configuration/ConfigurationSlice'
import undoable from 'redux-undo'

export const store = configureStore({
  reducer: {
    configuration: undoable(ConfigurationReducer)
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch