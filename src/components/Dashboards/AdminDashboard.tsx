import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AllDashboard.css";
//CUSTOM COMPONENTS
import Toolbar from "../Toolbar/Toolbar";
import UserProfile from "../UserProfile/UserProfile";
//LOCAL HELPERS
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getUserTypesCall } from "../../helpers/apiCalls";
import { setUserTypes } from "../../features/user/filterSlice";
import { RootState } from "../../app/store";
//MUI COMPONENTS AND TYPES
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
//MUI ICONS
import SettingsIcon from '@mui/icons-material/Settings';
import BusinessIcon from '@mui/icons-material/Business';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CableIcon from '@mui/icons-material/Cable';
import PeopleIcon from '@mui/icons-material/People';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';


const AdminDashboard = () => {
  const [showUserProfile, setShowUserProfile] = useState<boolean>(false);
  const navigate = useNavigate();
  const token = useAppSelector((state: RootState) => state.user.JWT)
  const types = useAppSelector((state: RootState) => state.filter.userTypes)
  const dispatch = useAppDispatch()

  useEffect(() => {
    //fetch user types
    getUserTypes()
  }, [])

  //MUI CONFIG
  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText("#398b93"),
    backgroundColor: "#f9a235",
    transition: 'all 0.3s',
    "&:hover": {
      backgroundColor: "#19467c",
      scale: '1.2',
    },
  }));

  //get user types
  async function getUserTypes() {
    if (types.length === 0) {
      const list = await getUserTypesCall(token)
      dispatch(setUserTypes(list))
    }
  }

  return (
    <div className="app_container">
      <Toolbar
        handleClickAccount={() => {
          if (token) setShowUserProfile(true);
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
            <span className="button_wrapper">
              <ColorButton
                variant="contained"
                onClick={() => {
                  navigate("/allcompanies");
                }}
                style={{ width: "400px", height: '50px', margin: '10px' }}
              >
                <BusinessIcon style={{ marginRight: '10px' }} />
                Kompanije
              </ColorButton>
              <ColorButton
                variant="contained"
                onClick={() => {
                  navigate("/allprojects");
                }}
                style={{ width: "400px", height: '50px', margin: '10px' }}
              >
                <InsertDriveFileIcon style={{ marginRight: '10px' }} />
                Projekti
              </ColorButton></span>
            <span className="button_wrapper"><ColorButton
              variant="contained"
              onClick={() => {
                navigate("/connections");
              }}
              style={{ width: "400px", height: '50px', margin: '10px' }}
            >
              <CableIcon style={{ marginRight: '10px' }} />
              Veze između kompanija i projekata
            </ColorButton></span>
            <span className="button_wrapper"><ColorButton
              variant="contained"
              onClick={() => {
                navigate("/allclients");
              }}
              style={{ width: "400px", height: '50px', margin: '10px' }}
            >
              <PeopleIcon style={{ marginRight: '10px' }} />
              Korisnici i podrška
            </ColorButton>
              <ColorButton
                variant="contained"
                onClick={() => {
                  navigate("/supportdashboard");
                }}
                style={{ width: "400px", height: '50px', margin: '10px' }}
              >
                <SupportAgentIcon style={{ marginRight: '10px' }} />
                Uloga podrške
              </ColorButton></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
