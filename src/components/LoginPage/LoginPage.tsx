import { useEffect, useState } from "react";
import logo from "../../assets/comdata.png";

import InputAdornment from "@mui/material/InputAdornment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import { OutlinedInput } from "@mui/material";
import Button from "@mui/material/Button";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loggedIn = () => {
    if (username && password) {
      // loginUserFn(email, password); -> ovde ide api poziv za login
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div className="login_content">
      <div className="app_name">
        <img
          src={logo}
          alt=""
          style={{ width: "40px", verticalAlign: "textTop" }}
        />
        <span style={{ marginLeft: "10px" }}>ComData Help Desk</span>
      </div>
      <div className="login_form">
        <h3 style={{ alignSelf: "flex-start", marginLeft: "100px" }}>Login</h3>
        <OutlinedInput
          id="input-with-icon-adornment"
          style={{ width: "400px", fontFamily: "Times New Roman" }}
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
            fontFamily: "Times New Roman",
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
            backgroundColor: "#398b93",
            color: "white",
          }}
          disabled={!(username && password)}
          onClick={loggedIn}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
