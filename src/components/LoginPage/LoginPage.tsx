import { useEffect, useState } from "react";
import { checkValidity } from "../../Helper";
import logo from "../../assets/comdata.png";

import InputAdornment from "@mui/material/InputAdornment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import { OutlinedInput } from "@mui/material";
import Button from "@mui/material/Button";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let validMail: boolean = false;

  const loggedIn = () => {
    if (email && password && validMail) {
      // loginUserFn(email, password); -> ovde ide api poziv za login
      setEmail("");
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
          style={{ width: "400px" }}
          startAdornment={
            <InputAdornment position="start">
              <AccountCircleIcon />
            </InputAdornment>
          }
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        {!checkValidity(
          email,
          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        ) ? (
          <span className="span_validation">
            {"It should be a valid email address!"}
          </span>
        ) : (
          (validMail = true)
        )}
        <OutlinedInput
          id="input-with-icon-adornment"
          style={{ width: "400px", marginTop: "10px" }}
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
          disabled={!(email && password && validMail)}
          onClick={loggedIn}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
