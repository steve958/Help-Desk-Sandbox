import Toolbar from "../Toolbar/Toolbar";
import "./ClientDashboard.css";
import ClientTable from "../Table/ClientTable";
import ClientFilters from "../Filters/ClientFilters";
import ClientAdminTable from "../Table/ClientAdminTable";
import ClientAdminFilters from "../Filters/ClientAdminFilters";
import { useSelector } from "react-redux";
import { state } from "../../main";
import { useState } from "react";
import SupportTable from "../Table/SupportTable";
import SupportFilters from "../Filters/SupportFilter";

let role = 'cliena'
const Dashboard = () => {
  const authState = useSelector((state: state) => state.auth);
  const [showUserProfile, setShowUserProfile] = useState(false);
  return (
    <div className="app_container">
      <Toolbar
        handleClickAccount={() => {
          if (authState["token"]) setShowUserProfile(true);
        }} />
      {/* <UserProfile
        show={showUserProfile}
        onClose={() => setShowUserProfile(false)}
      /> */}
      <div className="content_container">
        <h3 className="headings">Filters</h3>
        <div className="filter_container">
          {role === 'client' ? <ClientFilters /> : <SupportFilters />}
        </div>
        <h3>Your Tickets</h3>
        <div className="table_container">
          {role === 'client' ? <ClientTable /> : <SupportTable />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
