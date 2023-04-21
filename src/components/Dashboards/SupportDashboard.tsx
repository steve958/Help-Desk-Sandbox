import Toolbar from "../Toolbar/Toolbar";
import "./AllDashboard.css";
import { useSelector } from "react-redux";
import { state } from "../../main";
import { useState } from "react";
import UserProfile from "../UserProfile/UserProfile";
import SupportTable from "../Tables/SupportTable";
import SupportFilters from "../Filters/SupportFilter";
import FilterListIcon from '@mui/icons-material/FilterList';
import StorageIcon from '@mui/icons-material/Storage';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const SupportDashboard = () => {
  const authState = useSelector((state: state) => state.auth);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [expanded, setExpanded] = useState<boolean>(false);


  function handleChange() {
    setExpanded(!expanded)
  }

  return (
    <div className="app_container">
      <Toolbar
        handleClickAccount={() => {
          if (authState["token"]) setShowUserProfile(true);
        }} />
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
          <SupportFilters />
        </div>
        <span className="heading_icon_wrapper">
          <h3 className="headings">Ticketi</h3>
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