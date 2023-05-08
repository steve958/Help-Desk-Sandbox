import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import filterReducer from '../features/user/filterSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        filter: filterReducer
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>