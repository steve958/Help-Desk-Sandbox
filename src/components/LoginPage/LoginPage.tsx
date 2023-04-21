import { useEffect, useState } from "react";
import logo from "../../assets/comdata.png";
import { useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import { OutlinedInput } from "@mui/material";
import Button from "@mui/material/Button";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loggedIn = () => {
    if (username && password) {
      // loginUserFn(email, password); -> ovde ide api poziv za login
      setUsername("");
      setPassword("");
      // simulacija prolaska kroz login i otvaranja dashboard-a
      navigate("/clientdashboard");
      // navigate("admindashboard");
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
        <h3 style={{ alignSelf: "flex-start", marginLeft: "100px", color: '#19467c', fontSize: '2em' }}>Prijavi se</h3>
        <OutlinedInput
          id="input-with-icon-adornment"
          style={{
            width: "400px", height: '50px', backgroundColor: 'white'
          }}
          startAdornment={
            <InputAdornment position="start">
              <AccountCircleIcon />
            </InputAdornment>
          }
          type="text"
          placeholder="Username"
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
          placeholder="Password"
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
