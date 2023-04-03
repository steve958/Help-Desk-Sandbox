import { ShowProp } from "../../interfaces";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { state } from "../../main";
import * as actions from "../../store/actions/index";

const UserProfile: React.FC<ShowProp> = ({ show, onClose }) => {
  const authState = useSelector((state: state) => state.auth);
  const dispatch = useDispatch();
  const { logoutUserFn } = bindActionCreators(actions, dispatch);

  const logoutAndClose = () => {
    logoutUserFn();
    onClose();
  };

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
                {`${authState["user"]["firstName"]}  ${authState["user"]["lastName"]}`}
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
                {authState["user"]["firstName"]}
              </h3>
              <label style={labelStyle}>Last Name</label>
              <h3 style={{ margin: "20px 0 0 0" }}>
                {authState["user"]["lastName"]}
              </h3>
              <label style={labelStyle}>Email Address</label>
              <h3 style={{ margin: "20px 0 0 0" }}>
                {authState["user"]["lastName"]}
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
            onClick={logoutAndClose}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserProfile;
