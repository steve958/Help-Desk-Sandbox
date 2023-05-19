import { useState } from "react";
import './Ticket.css'
//CUSTOM COMPONENTS
import UserProfile from "../UserProfile/UserProfile";
import Toolbar from "../Toolbar/Toolbar";
import ClientViewTicket from "./ClientViewTicket";
import SupportViewTicket from "./SupportViewTicket";
//LOCAL HELPERS
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";


const Ticket = () => {

  const token = useAppSelector((state: RootState) => state.user.JWT)
  const user = useAppSelector((state: RootState) => state.user.userData)
  const [showUserProfile, setShowUserProfile] = useState(false);

  function dahsboardProvider() {
    switch (user.userType.userTypeId) {
      case 1:
        return <SupportViewTicket />
      case 2:
        return <SupportViewTicket />
      case 3:
        return <ClientViewTicket />
      case 4:
        return <ClientViewTicket />
      default:
        break;
    }
  }

  return <div className="ticket_container">
    <Toolbar handleClickAccount={() => {
      if (token) setShowUserProfile(true)
    }} />
    <UserProfile
      show={showUserProfile}
      onClose={() => setShowUserProfile(false)}
    />
    {dahsboardProvider()}
  </div >
}

export default Ticket;
