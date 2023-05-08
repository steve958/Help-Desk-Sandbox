import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User, UserSlicePayload } from '../../interfaces'


interface UserState {
    JWT: string,
    userData: User | any,
}

const initialState: UserState = {
    JWT: '',
    userData: {}
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action: PayloadAction<UserSlicePayload>) {
            state.JWT = action.payload.token
            state.userData = action.payload.data
        },

        logout(state) {
            state.JWT = ''
            state.userData = {}
        }
    }
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer