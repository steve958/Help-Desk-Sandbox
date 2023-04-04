import { useState } from "react";
import Toolbar from "../Toolbar/Toolbar";
import './Ticket.css'
import { useSelector } from "react-redux";
import { state } from "../../main";
import ClientViewTicket from "./ClientViewTicket";


const Ticket = () => {

  const authState = useSelector((state: state) => state.auth);
  const [showUserProfile, setShowUserProfile] = useState(false);

  return <div className="ticket_container">
    <Toolbar handleClickAccount={() => {
      if (authState["token"]) setShowUserProfile(true)
    }} />
    <ClientViewTicket />
  </div >
}

export default Ticket;
