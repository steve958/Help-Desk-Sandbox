import { useState } from "react";
import Toolbar from "../Toolbar/Toolbar";
import './Ticket.css'
import { useSelector } from "react-redux";
import { state } from "../../main";
import ClientViewTicket from "./ClientViewTicket";
import SupportViewTicket from "./SupportViewTicket";


const Ticket = () => {

  const authState = useSelector((state: state) => state.auth);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showTicketDetails, setShowTicketDetails] = useState('client')

  return <div className="ticket_container">
    <Toolbar handleClickAccount={() => {
      if (authState["token"]) setShowUserProfile(true)
    }} />
    <div className="display_change">
      <button onClick={() => setShowTicketDetails('client')}>client</button>
      <button onClick={() => setShowTicketDetails('support')}>support</button>
    </div>
    {showTicketDetails === 'client' && <ClientViewTicket />}
    {showTicketDetails === 'support' && <SupportViewTicket />}
  </div >
}

export default Ticket;
