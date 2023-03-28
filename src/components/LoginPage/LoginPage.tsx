import { useEffect, useState } from "react";
import { checkValidity } from "../../Helper";

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
      <h3>ComData Help Desk i slikica ispred</h3>
      <div style={{ display: "flex", flexFlow: "column" }}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="loginInputs"
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
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="loginInputs"
        />
        <button
          disabled={!(email && password && validMail)}
          onClick={loggedIn}
          className="loginButton"
        >
          Login to your Account
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
