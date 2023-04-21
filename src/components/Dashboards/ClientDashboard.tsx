import Toolbar from "../Toolbar/Toolbar";
import "./AllDashboard.css";
import ClientTable from "../Tables/ClientTable";
import ClientFilters from "../Filters/ClientFilters";
import ClientAdminTable from "../Tables/ClientAdminTable";
import ClientAdminFilters from "../Filters/ClientAdminFilters";
import UserProfile from "../UserProfile/UserProfile";
import { useSelector } from "react-redux";
import { state } from "../../main";
import { useState } from "react";
import SupportTable from "../Tables/SupportTable";
import SupportFilters from "../Filters/SupportFilter";
import FilterListIcon from '@mui/icons-material/FilterList';
import StorageIcon from '@mui/icons-material/Storage';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const ClientDashboard = () => {
  const authState = useSelector((state: state) => state.auth);
  const [showUserProfile, setShowUserProfile] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [displayDashboard, setDispalyDashboard] = useState("client");


  function handleChange() {
    setExpanded(!expanded)
  }

  return (
    <div className="app_container">
      <div className="display_change">
        <button onClick={() => setDispalyDashboard("client")}>client</button>
        <button onClick={() => setDispalyDashboard("client-admin")}>
          client admin
        </button>
        <button onClick={() => setDispalyDashboard("support")}>support</button>
      </div>
      <Toolbar
        handleClickAccount={() => {
          if (authState["token"]) setShowUserProfile(true);
        }}
      />
      <UserProfile
        show={showUserProfile}
        onClose={() => setShowUserProfile(false)}
      />
      <div className="content_container">
        <span className="heading_icon_wrapper tooltip" onClick={handleChange}>
          <span style={{ position: 'absolute', color: 'white', left: '45%' }}>{expanded ? <ExpandLessIcon style={{ color: 'white' }} /> : <ExpandMoreIcon style={{ color: 'white' }} />}{expanded ? 'sakriti filtere' : 'prikazati filtere'}{expanded ? <ExpandLessIcon style={{ color: 'white' }} /> : <ExpandMoreIcon style={{ color: 'white' }} />}</span>
          <h3 className="headings">Filteri</h3>
          <FilterListIcon style={{ color: '#19467c' }} />
        </span>
        <div className="filter_container" style={{ display: expanded ? 'flex' : 'none' }}>
          {displayDashboard === "client" && <ClientFilters />}
          {displayDashboard === "client-admin" && <ClientAdminFilters />}
          {displayDashboard === "support" && <SupportFilters />}
        </div>
        <span className="heading_icon_wrapper">
          <h3 className="headings">Tiketi</h3>
          <StorageIcon style={{ color: '#19467c' }} />
        </span>
        <div className="table_container">
          {displayDashboard === "client" && <ClientTable />}
          {displayDashboard === "client-admin" && <ClientAdminTable />}
          {displayDashboard === "support" && <SupportTable />}
        </div>
      </div>
    </div >
  );
};

export default ClientDashboard;
