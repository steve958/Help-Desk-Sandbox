import { useEffect, useState } from "react";
import logo from "../../assets/comdata.png";
import { useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import { OutlinedInput } from "@mui/material";
import Button from "@mui/material/Button";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { useAppDispatch } from "../../app/hooks";
import { login } from "../../features/user/userSlice";
import { loginCall } from "../../helpers/apiCalls";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch()


  const loggedIn = async () => {
    if (username && password) {
      setUsername("");
      setPassword("");
      try {
        const response = await loginCall()
        if (response) {
          dispatch(login({
            token: response.token,
            data: response.user
          }))
        }
        switch (response.user.userType.userTypeName) {
          case 'Admin':
            navigate("admindashboard");
            break;
          default:
            break;
        }
      } catch (error: any) {
        console.error(error.message)
      }
    }
  };

  return (
    <div className="login_content">
      <span className="background"></span>
      <div className="app_name">
        <img
          src={logo}
          alt=""
          style={{ width: "40px", verticalAlign: "textTop" }}
        />
        {/* <span style={{ marginLeft: "10px" }}>ComData Help Desk</span> */}
        <span style={{ position: 'absolute', left: '0', top: '10px' }} className="logo_help_desk">
        </span>
      </div>
      <div className="login_form">
        <span className='heading_icon_wrapper' style={{ width: '400px' }}>
          <h3 className="headings">Prijavi se</h3>
          <AssignmentIndIcon style={{ color: '#19467c' }} />
        </span>
        <OutlinedInput
          id="input-with-icon-adornment"
          style={{ width: "400px", height: '50px', backgroundColor: 'white' }}
          startAdornment={
            <InputAdornment position="start">
              <AccountCircleIcon />
            </InputAdornment>
          }
          type="text"
          placeholder="korisničko ime"
          onChange={(e) => setUsername(e.target.value)}
        />
        <OutlinedInput
          id="input-with-icon-adornment"
          style={{
            width: "400px",
            marginTop: "10px",
            height: '50px',
            backgroundColor: 'white'
          }}
          startAdornment={
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          }
          type="password"
          placeholder="šifra"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          style={{
            marginTop: "10px",
            width: "400px",
            backgroundColor: "#19467c",
            color: "white",
            height: '50px',
            fontWeight: '600'
          }}
          disabled={!(username && password)}
          onClick={loggedIn}
        >
          PRIJAVA
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
