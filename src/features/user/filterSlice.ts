import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Company, Project, TicketPriority, TicketStatus, TicketType, UserTypes } from '../../interfaces'


interface FilterState {
    userTypes: UserTypes[] | []
    ticketStatuses: TicketStatus[] | []
    ticketPriorities: TicketPriority[] | []
    ticketTypes: TicketType[] | []
    allCompanies: Company[] | []
    allProjects: Project[] | []
}

const initialState: FilterState = {
    userTypes: [],
    ticketStatuses: [],
    ticketPriorities: [],
    ticketTypes: [],
    allCompanies: [],
    allProjects: []
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setUserTypes(state, action: PayloadAction<UserTypes[]>) {
            state.userTypes = action.payload
        },
        setTicketStatuses(state, action: PayloadAction<TicketStatus[]>) {
            state.ticketStatuses = action.payload
        },
        setTicketPriorities(state, action: PayloadAction<TicketPriority[]>) {
            state.ticketPriorities = action.payload
        },
        setTicketTypes(state, action: PayloadAction<TicketType[]>) {
            state.ticketTypes = action.payload
        },
        setAllCompanies(state, action: PayloadAction<Company[]>) {
            state.allCompanies = action.payload
        },
        setAllProjects(state, action: PayloadAction<Project[]>) {
            state.allProjects = action.payload
        }
    }
})

export const { setUserTypes, setTicketStatuses, setTicketPriorities, setTicketTypes, setAllCompanies, setAllProjects } = filterSlice.actions
export default filterSlice.reducer