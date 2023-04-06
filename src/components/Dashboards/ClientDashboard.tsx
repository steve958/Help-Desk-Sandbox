import Toolbar from "../Toolbar/Toolbar";
import "./AllDashboard.css";
import ClientTable from "../Tables/ClientTable";
import ClientFilters from "../Filters/ClientFilters";
import ClientAdminTable from "../Tables/ClientAdminTable";
import ClientAdminFilters from "../Filters/ClientAdminFilters";
import { useSelector } from "react-redux";
import { state } from "../../main";
import { useState } from "react";
import SupportTable from "../Tables/SupportTable";
import SupportFilters from "../Filters/SupportFilter";
import FilterListIcon from '@mui/icons-material/FilterList';
import StorageIcon from '@mui/icons-material/Storage';

const ClientDashboard = () => {
  const authState = useSelector((state: state) => state.auth);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [displayDashboard, setDispalyDashboard] = useState('client')
  return (
    <div className="app_container">
      <div className="display_change">
        <button onClick={() => setDispalyDashboard('client')}>client</button>
        <button onClick={() => setDispalyDashboard('client-admin')}>client admin</button>
        <button onClick={() => setDispalyDashboard('support')}>support</button>
      </div>
      <Toolbar
        handleClickAccount={() => {
          if (authState["token"]) setShowUserProfile(true);
        }} />
      {/* <UserProfile
        show={showUserProfile}
        onClose={() => setShowUserProfile(false)}
      /> */}
      <div className="content_container">
        <span className="heading_icon_wrapper">
          <h3 className="headings">Filters</h3>
          <FilterListIcon style={{ color: '#19467c' }} />
        </span>
        <div className="filter_container">
          {displayDashboard === 'client' && <ClientFilters />}
          {displayDashboard === 'client-admin' && <ClientAdminFilters />}
          {displayDashboard === 'support' && <SupportFilters />}
        </div>
        <span className="heading_icon_wrapper">
          <h3 className="headings">Tickets</h3>
          <StorageIcon style={{ color: '#19467c' }} />
        </span>
        <div className="table_container">
          {displayDashboard === 'client' && <ClientTable />}
          {displayDashboard === 'client-admin' && <ClientAdminTable />}
          {displayDashboard === 'support' && <SupportTable />}
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
