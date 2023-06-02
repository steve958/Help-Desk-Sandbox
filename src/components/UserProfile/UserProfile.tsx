import { useEffect, useState } from 'react'
//CUSTOM HELPERS
import { ShowProp, User } from "../../interfaces";
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { logout } from "../../features/user/userSlice";
import { RootState } from '../../app/store';
//MUI COMPONENTS AND TYPES
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import { OutlinedInput } from "@mui/material";
//MUI ICONS
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { changePasswordUserCall } from '../../helpers/apiCalls';

const UserProfile: React.FC<ShowProp> = ({ show, onClose }) => {

  const [passwordCard, setPasswordCard] = useState<boolean>(false)
  const [oldPassword, setOldPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const dispatch = useAppDispatch()
  const token = useAppSelector((state: RootState) => state.user.JWT)
  const user: User | any = useAppSelector(state => state.user)

  useEffect(() => {
    if (successMessage || errorMessage) {
      setTimeout(() => { setSuccessMessage(''); setErrorMessage(''); setOldPassword(''), setNewPassword('') }, 4000)
    }
  }, [successMessage, errorMessage])


  let labelStyle = {
    margin: "20px 0 0 0",
    fontSize: "18px",
    color: "grey",
  };

  function logoutFn() {
    dispatch(logout()); onClose()
  }

  async function changePasswordFn() {
    if (!oldPassword || !newPassword) {
      setErrorMessage('Polja stara i nova šifra su obavezna')
    } else {
      const response = await changePasswordUserCall(token, user.userData.userId, oldPassword, newPassword)
      if (response) {
        setSuccessMessage('Uspešno promenjena šifra')
      } else {
        setErrorMessage('Došlo je do greške pri promeni šifre')
      }
    }
  }

  return (
    <div>
      <Dialog open={show} onClose={onClose}>
        <DialogContent>
          <div
            style={{
              display: "flex",
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <div className="modal_heading">
              <span onClick={() => setPasswordCard(false)} style={{ borderBottom: `${!passwordCard ? 'none' : '2px solid #19467c'}`, backgroundColor: `${passwordCard ? '#19467c2a' : 'white'}` }}>Profil</span>
              <span onClick={() => setPasswordCard(true)} style={{ borderBottom: `${passwordCard ? 'none' : '2px solid #19467c'}`, backgroundColor: `${!passwordCard ? '#19467c2a' : 'white'}` }}>Promena šifre</span>
            </div>
            {!passwordCard ? <div
              style={{
                display: "flex",
                flexFlow: "column",
                alignItems: "center",
                marginTop: '20px',
                minHeight: '45vh'
              }}
            >
              <label style={labelStyle}>Ime</label>
              <h3 style={{ margin: "20px 0 0 0" }}>
                {user.userData["firstName"]}
              </h3>
              <label style={labelStyle}>Prezime</label>
              <h3 style={{ margin: "20px 0 0 0" }}>
                {user.userData["lastName"]}
              </h3>
              <label style={labelStyle}>Korisničko ime</label>
              <h3 style={{ margin: "20px 0 0 0" }}>
                {user.userData["username"]}
              </h3>
              <label style={labelStyle}>Email</label>
              <h3 style={{ margin: "20px 0 0 0" }}>
                {user.userData["email"]}
              </h3>
              <label style={labelStyle}>Tip korisnika</label>
              <h3 style={{ margin: "20px 0 0 0" }}>
                {user?.userData?.userType?.userTypeName}
              </h3>
            </div> : <div
              style={{
                display: "flex",
                flexFlow: "column",
                alignItems: "center",
                justifyContent: 'center',
                marginTop: '20px',
                minHeight: '45vh'
              }}
            >
              {successMessage &&
                <span style={{ position: 'absolute', top: '80px', display: 'flex', alignItems: 'center', color: 'green' }}>
                  <CheckCircleOutlineIcon style={{ color: 'green', marginRight: '6px' }} />
                  <p>{successMessage}</p>
                </span>}
              {errorMessage &&
                <span style={{ position: 'absolute', top: '80px', display: "flex", alignItems: 'center', color: 'red' }}>
                  <ErrorOutlineIcon style={{ color: 'red', marginRight: '6px' }} />
                  <p>{errorMessage}</p>
                </span>}
              <label style={labelStyle}>Stara šifra</label>
              <OutlinedInput value={oldPassword} onChange={(e: any) => setOldPassword(e.target.value)} style={{ marginTop: '10px', fontWeight: '600' }} />
              <label style={labelStyle}>Nova šifra</label>
              <OutlinedInput value={newPassword} onChange={(e: any) => setNewPassword(e.target.value)} style={{ marginTop: '10px', fontWeight: '600' }} />
            </div>}
          </div>
        </DialogContent >
        <DialogActions style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            style={{
              marginTop: "10px",
              width: "300px",
              backgroundColor: "#19467c",
              color: "white",
            }}
            onClick={() => !passwordCard ? logoutFn() : changePasswordFn()}
          >
            {!passwordCard ? 'Odjavi se' : 'Promeni šifru'}
          </Button>
        </DialogActions>
      </Dialog >
    </div >
  );
};

export default UserProfile;
