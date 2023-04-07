import Toolbar from "../Toolbar/Toolbar";
import "./AllDashboard.css";
import { useSelector } from "react-redux";
import { state } from "../../main";
import { useState } from "react";
import SupportTable from "../Tables/SupportTable";
import SupportFilters from "../Filters/SupportFilter";
import FilterListIcon from '@mui/icons-material/FilterList';
import StorageIcon from '@mui/icons-material/Storage';

const SupportDashboard = () => {
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
        <span className="heading_icon_wrapper">
          <h3 className="headings">Filters</h3>
          <FilterListIcon style={{ color: '#19467c' }} />
        </span>
        <div className="filter_container">
          <SupportFilters />
        </div>
        <span className="heading_icon_wrapper">
          <h3 className="headings">Tickets</h3>
          <StorageIcon style={{ color: '#19467c' }} />
        </span>
        <div className="table_container">
          <SupportTable />
        </div>
      </div>
    </div>
  );
};

export default SupportDashboard;