import { useState, useEffect } from "react";
import "./AllDashboard.css";
//CUSTOM COMPONENTS
import Toolbar from "../Toolbar/Toolbar";
import UserProfile from "../UserProfile/UserProfile";
import SupportTable from "../Tables/SupportTable";
//LOCAL HELPERS
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { allCompaniesCall, allProjectsCall, allTicketsCall, getTicketPrioritiesCall, getTicketStatusesCall, getTicketTypesCall } from "../../helpers/apiCalls";
import { setAllTickets } from "../../features/user/userSlice";
import { setAllCompanies, setAllProjects, setTicketPriorities, setTicketStatuses, setTicketTypes } from "../../features/user/filterSlice";
//MUI ICONS
import SupportFilters from "../Filters/SupportFilter";
import FilterListIcon from '@mui/icons-material/FilterList';
import StorageIcon from '@mui/icons-material/Storage';

const SupportDashboard = () => {
  const token = useAppSelector((state: RootState) => state.user.JWT)
  const dispatch = useAppDispatch()
  const statuses = useAppSelector((state: RootState) => state.filter?.ticketStatuses.length > 0 ? state.filter?.ticketStatuses : null)
  const priorities = useAppSelector((state: RootState) => state.filter?.ticketPriorities.length > 0 ? state.filter?.ticketPriorities : null)
  const types = useAppSelector((state: RootState) => state.filter?.ticketTypes.length > 0 ? state.filter?.ticketTypes : null)
  const companies = useAppSelector((state: RootState) => state.filter.allCompanies.length > 0 ? state.filter.allCompanies : null)
  const projects = useAppSelector((state: RootState) => state.filter.allProjects.length > 0 ? state.filter.allProjects : null)
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<string>('Sve')
  const [selectedProject, setSelectedProject] = useState<string>('Svi')
  const [selectedStatus, setSelectedStatus] = useState<string>('Svi')
  const [selectedType, setSelectedType] = useState<string>('Svi')
  const [selectedPriority, setSelectedPriority] = useState<string>('Svi')
  const [timeTableFrom, setTimeTableFrom] = useState<Date>(new Date('2023-01-01T08:51'))
  const [timeTableTo, setTimeTableTo] = useState<Date>(new Date('2030-01-01T08:53'))
  const [query, setQuery] = useState<string>('')

  useEffect(() => {
    fetchData()
  }, [])

  //fetch various data 
  async function fetchData() {
    try {
      const tickets = await allTicketsCall(token)
      if (tickets) {
        dispatch(setAllTickets(tickets))
      }
      if (!companies || !projects) {
        const companiesResponse = await allCompaniesCall(token)
        if (companiesResponse) {
          dispatch(setAllCompanies(companiesResponse))
        }
        const projectsResponse = await allProjectsCall(token)
        if (projectsResponse) {
          dispatch(setAllProjects(projectsResponse))
        }
      }
      if (statuses && priorities && types) {
        return
      } else {
        const statusesNew = await getTicketStatusesCall(token)
        if (statusesNew) {
          dispatch(setTicketStatuses(statusesNew))
        }
        const prioritiesNew = await getTicketPrioritiesCall(token)
        if (prioritiesNew) {
          dispatch(setTicketPriorities(prioritiesNew))
        }
        const typesNew = await getTicketTypesCall(token)
        if (typesNew) {
          dispatch(setTicketTypes(typesNew))
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="app_container">
      <Toolbar
        handleClickAccount={() => {
          if (token) setShowUserProfile(true);
        }} />
      <UserProfile
        show={showUserProfile}
        onClose={() => setShowUserProfile(false)}
      />
      <div className="content_container">
        <div style={{ width: '95%' }}>
          <span className="heading_icon_wrapper">
            <h3 className="headings">Filteri</h3>
            <FilterListIcon style={{ color: '#19467c' }} />
          </span>
          <SupportFilters
            selectedCompany={selectedCompany}
            selectedProject={selectedProject}
            selectedStatus={selectedStatus}
            selectedType={selectedType}
            selectedPriority={selectedPriority}
            setSelectedCompany={setSelectedCompany}
            setSelectedProject={setSelectedProject}
            setSelectedStatus={setSelectedStatus}
            setSelectedType={setSelectedType}
            setSelectedPriority={setSelectedPriority}
            setTimeTableFrom={setTimeTableFrom}
            setTimeTableTo={setTimeTableTo}
            query={query}
            setQuery={setQuery} />
        </div>
        <span className="heading_icon_wrapper">
          <h3 className="headings">Tiketi</h3>
          <StorageIcon style={{ color: '#19467c' }} />
        </span>
        <div className="table_container">
          <SupportTable
            selectedCompany={selectedCompany}
            selectedProject={selectedProject}
            selectedStatus={selectedStatus}
            selectedType={selectedType}
            selectedPriority={selectedPriority}
            query={query}
            timeTableFrom={timeTableFrom}
            timeTableTo={timeTableTo} />
        </div>
      </div>
    </div>
  );
};

export default SupportDashboard;