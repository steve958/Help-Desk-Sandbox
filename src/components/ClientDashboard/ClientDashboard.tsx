import Toolbar from "../Toolbar/Toolbar";
import { useSelector } from "react-redux";
import { state } from "../../main";
import { useState } from "react";

const Dashboard = () => {
  const authState = useSelector((state: state) => state.auth);
  const [showUserProfile, setShowUserProfile] = useState(false);
  return (
    <div className="app_container">
      <Toolbar
        handleClickAccount={() => {
          if (authState["token"]) setShowUserProfile(true);
        }}
      />
      {/* <UserProfile
        show={showUserProfile}
        onClose={() => setShowUserProfile(false)}
      /> */}
      <div className="content_container"></div>
    </div>
  );
};

export default Dashboard;
