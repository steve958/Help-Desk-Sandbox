import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import filterReducer from '../features/user/filterSlice'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig1 = {
    key: 'user',
    storage
}

const persistConfig2 = {
    key: 'fiter',
    storage
}

const persistedReducer1 = persistReducer(persistConfig1, userReducer)
const persistedReducer2 = persistReducer(persistConfig2, filterReducer)

export const store = configureStore({
    reducer: {
        user: persistedReducer1,
        filter: persistedReducer2
    }
})

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>