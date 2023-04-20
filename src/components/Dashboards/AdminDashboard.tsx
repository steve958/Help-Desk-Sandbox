import "./AllDashboard.css";
import { useSelector } from "react-redux";
import { state } from "../../main";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toolbar from "../Toolbar/Toolbar";
import UserProfile from "../UserProfile/UserProfile";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import SettingsIcon from '@mui/icons-material/Settings';

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
        <span className="background"></span>
        <div className="admin_container">
          <span className='admin_icon_wrapper'>
            <h3 className="headings">Admin panel</h3>
            <SettingsIcon style={{ color: '#19467c' }} />
          </span>
          <div className="admin_button_container">
            <span className="button_wrapper"><ColorButton
              variant="contained"
              onClick={() => {
                navigate("/allclients");
              }}
              style={{ width: "400px", height: '50px', margin: '10px' }}
            >
              Korisnici i podrška
            </ColorButton>
              <ColorButton
                variant="contained"
                onClick={() => {
                  navigate("/supportdashboard");
                }}
                style={{ width: "400px", height: '50px', margin: '10px' }}
              >
                Uloga podrške
              </ColorButton></span>
            <span className="button_wrapper"><ColorButton
              variant="contained"
              onClick={() => {
                navigate("/connections");
              }}
              style={{ width: "400px", height: '50px', margin: '10px' }}
            >
              Veze između kompanija i projekata
            </ColorButton></span>
            <span className="button_wrapper"><ColorButton
              variant="contained"
              onClick={() => {
                navigate("/allcompanies");
              }}
              style={{ width: "400px", height: '50px', margin: '10px' }}
            >
              Kompanije
            </ColorButton>
              <ColorButton
                variant="contained"
                onClick={() => {
                  navigate("/allprojects");
                }}
                style={{ width: "400px", height: '50px', margin: '10px' }}
              >
                Projekti
              </ColorButton></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
