import { ShowProp, User } from "../../interfaces";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from '../../app/hooks'

const UserProfile: React.FC<ShowProp> = ({ show, onClose }) => {

  let labelStyle = {
    margin: "20px 0 0 0",
    fontSize: "small",
    color: "grey",
  };

  return (
    <div>
      <Dialog open={show} onClose={onClose}>
        <DialogContent>
          <div
            style={{
              display: "flex",
              flexFlow: "column",
              paddingLeft: "20px",
            }}
          >
            <div style={{ display: "flex" }}>
              <span
                style={{
                  marginLeft: "10px",
                  alignSelf: "center",
                }}
              >
                {/* {`${user.firstName}  ${user["lastName"]}`} */}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexFlow: "column",
                alignItems: "flex-start",
              }}
            >
              <label style={labelStyle}>First Name</label>
              <h3 style={{ margin: "20px 0 0 0" }}>
                {/* {user["firstName"]} */}
              </h3>
              <label style={labelStyle}>Last Name</label>
              <h3 style={{ margin: "20px 0 0 0" }}>
                {/* {user["lastName"]} */}
              </h3>
              <label style={labelStyle}>Username</label>
              <h3 style={{ margin: "20px 0 0 0" }}>
                {/* {user["username"]} */}
              </h3>
              <label style={labelStyle}>Email Address</label>
              <h3 style={{ margin: "20px 0 0 0" }}>
                {/* {user["email"]} */}
              </h3>
            </div>
          </div>
        </DialogContent>
        <DialogActions style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            style={{
              marginTop: "10px",
              width: "400px",
              backgroundColor: "#19467c",
              color: "white",
            }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserProfile;
