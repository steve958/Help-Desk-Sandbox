import Toolbar from "../Toolbar/Toolbar";

import "./ClientDashboard.css";
import ClientTable from "../Table/ClientTable";
import ClientFilters from "../Filters/ClientFilters";
import ClientAdminTable from "../Table/ClientAdminTabe";
import ClientAdminFilters from "../Filters/ClientAdminFilters";
import { useSelector } from "react-redux";
import { state } from "../../main";
import { useState } from "react";

let role = 'client_admin'
const Dashboard = () => {
  const authState = useSelector((state: state) => state.auth);
  const [showUserProfile, setShowUserProfile] = useState(false);
  return (
    <div className="app_container">
      <Toolbar 
      handleClickAccount={() => {
          if (authState["token"]) setShowUserProfile(true);
        }}/>
        {/* <UserProfile
        show={showUserProfile}
        onClose={() => setShowUserProfile(false)}
      /> */}
      <div className="content_container">
        <h3 className="headings">Filters</h3>
        <div className="filter_container">
          {role === 'client' ? <ClientFilters /> : <ClientAdminFilters />}
        </div>
        <h3>Your Tickets</h3>
        <div className="table_container">
          {role === 'client' ? <ClientTable /> : <ClientAdminTable />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
