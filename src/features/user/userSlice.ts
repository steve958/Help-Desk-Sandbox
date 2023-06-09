import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CompanyProjectUser, Ticket, User, UserSliceConnectionsPayload, UserSlicePayload } from '../../interfaces'

interface UserState {
    JWT: string,
    userData: User | any,
    userConnections: CompanyProjectUser[] | any
    allTickets: Ticket[] | any
    userSelectedTicket: Ticket | any
    selectedUser: User | any
}

const initialState: UserState = {
    JWT: '',
    userData: {},
    userConnections: [],
    allTickets: [],
    userSelectedTicket: {},
    selectedUser: {}
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action: PayloadAction<UserSlicePayload>) {
            state.JWT = action.payload.token
            state.userData = action.payload.data
        },

        setConnections(state, action: PayloadAction<UserSliceConnectionsPayload>) {
            state.userConnections = action.payload.connections
        },

        setSelectedTicket(state, action: PayloadAction<Ticket>) {
            state.userSelectedTicket = action.payload
        },

        setAllTickets(state, action: PayloadAction<Ticket[]>) {
            state.allTickets = action.payload
        },

        setSelectedUser(state, action: PayloadAction<User>) {
            state.selectedUser = action.payload
        },

        logout(state) {
            state.JWT = ''
            state.userData = {}
        },
    }
})

export const { login, logout, setConnections, setSelectedTicket, setAllTickets, setSelectedUser } = userSlice.actions
export default userSlice.reducer