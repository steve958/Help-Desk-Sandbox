import "./AllDashboard.css";
import { useSelector } from "react-redux";
import { state } from "../../main";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toolbar from "../Toolbar/Toolbar";
import UserProfile from "../UserProfile/UserProfile";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText("#398b93"),
  backgroundColor: "#f9a235",
  "&:hover": {
    backgroundColor: "#19467c",
  },
}));

const AdminDashboard = () => {
  const authState = useSelector((state: state) => state.auth);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="app_container">
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
        <div className="admin_container">
          <div className="admin_button_container">
            <ColorButton
              variant="contained"
              onClick={() => {
                navigate("/allclients");
              }}
              style={{ width: "130px" }}
            >
              Clients
            </ColorButton>
            <ColorButton
              variant="contained"
              onClick={() => {
                navigate("/allsupport");
              }}
              style={{ width: "130px" }}
            >
              Support
            </ColorButton>
          </div>
          <div className="admin_button_container">
            <ColorButton
              variant="contained"
              onClick={() => {
                navigate("/allcompanies");
              }}
              style={{ width: "130px" }}
            >
              Companies
            </ColorButton>
            <ColorButton
              variant="contained"
              onClick={() => {
                navigate("/allprojects");
              }}
              style={{ width: "130px" }}
            >
              Projects
            </ColorButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
