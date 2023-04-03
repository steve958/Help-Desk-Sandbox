import Toolbar from "../Toolbar/Toolbar";
import "./AllDashboard.css";
import { useSelector } from "react-redux";
import { state } from "../../main";
import { useState } from "react";
import SupportTable from "../Tables/SupportTable";
import SupportFilters from "../Filters/SupportFilter";

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
                <h3 className="headings">Filters</h3>
                <div className="filter_container">
                    <SupportFilters />
                </div>
                <h3>Tickets</h3>
                <div className="table_container">
                    <SupportTable />
                </div>
            </div>
        </div>
    );
};

export default SupportDashboard;
