import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//LOCAL HELPERS
import { useAppDispatch } from "../../app/hooks";
import { login } from "../../features/user/userSlice";
import { loginCall } from "../../helpers/apiCalls";
//MUI COMPONENTS AND TYPES
import InputAdornment from "@mui/material/InputAdornment";
import { OutlinedInput } from "@mui/material";
import Button from "@mui/material/Button";
//MUI ICONS
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Loader from "../Loader/Loader";

const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [loader, setLoader] = useState<boolean>(false)
  const navigate = useNavigate();
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => { setErrorMessage('') }, 4000)
    }
  }, [errorMessage])

  const loggedIn = async () => {
    if (username && password) {
      setUsername("");
      setPassword("");
      try {
        setLoader(true)
        const response = await loginCall(username, password)
        if (response) {
          dispatch(login({
            token: response.token,
            data: response.user
          }))
          switch (response.user.userType.userTypeName) {
            case 'Admin':
              navigate("admindashboard");
              break;
            case 'Client':
              navigate("clientdashboard");
              break;
            case 'Client_Admin':
              navigate("clientdashboard");
              break;
            case 'Support':
              navigate("supportdashboard");
              break;
            default:
              break;
          }
          setTimeout(() => setLoader(false), 1000)
        } else {
          setLoader(false)
          setErrorMessage('Došlo je do greške')
          setPassword('')
          setUsername('')
        }
      } catch (error: any) {
        console.error(error.message)
      }
    }
  };

  return (
    <div className="login_content">
      <div className="app_name">
      </div>
      {errorMessage &&
        <span style={{ position: 'absolute', left: '45vw', top: '8vh', fontWeight: '600', display: "flex", alignItems: 'center', color: 'red' }}>
          <ErrorOutlineIcon style={{ color: 'red', marginRight: '6px' }} />
          <p>{errorMessage}</p>
        </span>}
      {loader ? <Loader /> : <div className="login_form">
        <span className="logo_help_desk">
        </span>
        <OutlinedInput
          id="input-with-icon-adonment"
          style={{ width: "400px", height: '50px', backgroundColor: 'white' }}
          startAdornment={
            <InputAdornment position="start">
              <AccountCircleIcon style={{ color: '#19467c' }} />
            </InputAdornment>
          }
          type="text"
          placeholder="korisničko ime"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <OutlinedInput
          id="input-with-icon-adornment"
          style={{
            width: "400px",
            marginTop: "10px",
            height: '50px',
            backgroundColor: 'white',
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }}
          startAdornment={
            <InputAdornment position="start">
              <LockIcon style={{ color: '#19467c' }} />
              <span style={{ position: 'absolute', right: '10px', cursor: 'pointer' }}
                onMouseDown={() => setShowPassword(true)} onMouseUp={() => setShowPassword(false)}>
                <RemoveRedEyeIcon style={{ color: '#19467c' }} />
              </span>
            </InputAdornment>
          }
          type={showPassword ? 'text' : "password"}
          placeholder="šifra"
          value={password}
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
      </div>}
    </div>
  );
};

export default LoginPage;
