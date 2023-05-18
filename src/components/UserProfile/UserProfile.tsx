import { ShowProp, User } from "../../interfaces";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { logout } from "../../features/user/userSlice";

const UserProfile: React.FC<ShowProp> = ({ show, onClose }) => {
  const dispatch = useAppDispatch()
  const user: User | any = useAppSelector(state => state.user)

  let labelStyle = {
    margin: "20px 0 0 0",
    fontSize: "18px",
    color: "grey",
  };

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
            <div style={{ display: "flex" }}>
            </div>
            <div
              style={{
                display: "flex",
                flexFlow: "column",
                alignItems: "center",
              }}
            >
              <label style={labelStyle}>First Name</label>
              <h3 style={{ margin: "20px 0 0 0" }}>
                {user.userData["firstName"]}
              </h3>
              <label style={labelStyle}>Last Name</label>
              <h3 style={{ margin: "20px 0 0 0" }}>
                {user.userData["lastName"]}
              </h3>
              <label style={labelStyle}>Username</label>
              <h3 style={{ margin: "20px 0 0 0" }}>
                {user.userData["username"]}
              </h3>
              <label style={labelStyle}>Email Address</label>
              <h3 style={{ margin: "20px 0 0 0" }}>
                {user.userData["email"]}
              </h3>
              <label style={labelStyle}>User Type</label>
              <h3 style={{ margin: "20px 0 0 0" }}>
                {user?.userData?.userType?.userTypeName}
              </h3>
            </div>
          </div>
        </DialogContent>
        <DialogActions style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            style={{
              marginTop: "10px",
              width: "300px",
              backgroundColor: "#19467c",
              color: "white",
            }}
            onClick={() => { dispatch(logout()); onClose() }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserProfile;
