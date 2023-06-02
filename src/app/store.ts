import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import filterReducer from '../features/user/filterSlice'
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig1 = {
    key: 'user',
    storage
}

const persistConfig2 = {
    key: 'filter',
    storage
}

const persistedReducer1 = persistReducer(persistConfig1, userReducer)
const persistedReducer2 = persistReducer(persistConfig2, filterReducer)

export const store = configureStore({
    reducer: {
        user: persistedReducer1,
        filter: persistedReducer2,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>