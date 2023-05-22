import { useEffect, useState } from "react";
import "./AllDashboard.css";
//CUSTOM COMPONENTS
import Toolbar from "../Toolbar/Toolbar";
import ClientTable from "../Tables/ClientTable";
import ClientFilters from "../Filters/ClientFilters";
import UserProfile from "../UserProfile/UserProfile";
import ClientAdminTable from "../Tables/ClientAdminTable";
//LOCAL HELPERS
import { Ticket } from "../../interfaces";
import { allTicketsFromUserCall, getTicketStatusesCall, getUsersConnectionsCall } from "../../helpers/apiCalls";
import { setTicketStatuses } from "../../features/user/filterSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { setConnections } from "../../features/user/userSlice";
import { allTicketsFromCompanyCall } from "../../helpers/apiCalls";
//MUI ICONS
import FilterListIcon from '@mui/icons-material/FilterList';
import StorageIcon from '@mui/icons-material/Storage';


const ClientDashboard = () => {
  const token = useAppSelector((state: RootState) => state.user.JWT)
  const user = useAppSelector((state: RootState) => state.user.userData)
  const dispatch = useAppDispatch()

  const [showUserProfile, setShowUserProfile] = useState<boolean>(false);
  const [ticketList, setTicketList] = useState<Ticket[] | []>([])
  const [selectedConnection, setSelectedConnection] = useState<string>('Svi')
  const [selectedStatus, setSelectedStatus] = useState<string>('Svi')
  const [timeTableFrom, setTimeTableFrom] = useState<Date>(new Date('2023-01-01T08:51'))
  const [timeTableTo, setTimeTableTo] = useState<Date>(new Date('2030-01-01T08:53'))

  useEffect(() => {
    fetchData()
  }, [])


  //fetch various data for the user
  async function fetchData() {
    try {

      const connections = await getUsersConnectionsCall(token, user.userId)
      if (connections) {
        dispatch(setConnections({ connections: [...connections] }))
      }
      const tickets = await allTicketsFromUserCall(token, user.userId)
      if (tickets) {
        setTicketList(tickets)
      }
      const statuses = await getTicketStatusesCall(token)
      if (statuses) {
        dispatch(setTicketStatuses(statuses))
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
        }}
      />
      <UserProfile
        show={showUserProfile}
        onClose={() => setShowUserProfile(false)}
      />
      <div className="content_container">
        <span className="heading_icon_wrapper">
          <span style={{ position: 'absolute', color: 'white', left: '45%' }}></span>
          <h3 className="headings">Filteri</h3>
          <FilterListIcon style={{ color: '#19467c' }} />
        </span>
        <div className="filter_container_client">
          <ClientFilters
            setSelectedConnection={setSelectedConnection}
            setSelectedStatus={setSelectedStatus}
            selectedStatus={selectedStatus}
            selectedConnection={selectedConnection}
            setTimeTableTo={setTimeTableTo}
            setTimeTableFrom={setTimeTableFrom} />
        </div>
        <span className="heading_icon_wrapper">
          <h3 className="headings">Tiketi</h3>
          <StorageIcon style={{ color: '#19467c' }} />
        </span>
        <div className="table_container">
          {user.userType.userTypeName === 'Client'
            ?
            <ClientTable
              data={ticketList}
              selectedConnection={selectedConnection}
              selectedStatus={selectedStatus}
              timeTableFrom={timeTableFrom}
              timeTableTo={timeTableTo} />
            :
            <ClientAdminTable
              data={ticketList}
              selectedConnection={selectedConnection}
              selectedStatus={selectedStatus}
              timeTableFrom={timeTableFrom}
              timeTableTo={timeTableTo} />
          }
        </div>
      </div>
    </div >
  );
};

export default ClientDashboard;
