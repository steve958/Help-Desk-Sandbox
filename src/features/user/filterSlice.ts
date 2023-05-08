import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserTypes } from '../../interfaces'


interface FilterState {
    userTypes: UserTypes[] | []
}

const initialState: FilterState = {
    userTypes: []
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setUserTypes(state, action: PayloadAction<UserTypes[]>) {
            state.userTypes = action.payload
        }
    }
})

export const { setUserTypes } = filterSlice.actions
export default filterSlice.reducer