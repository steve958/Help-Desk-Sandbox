import { NavLink } from "react-router-dom";
import logo from "../../assets/comdata.png";

export const checkValidity = (value: string, pattern: RegExp): boolean => {
  let isValid = true;
  if (value !== "") isValid = pattern.test(value) && isValid;
  return isValid;
};

let activeStyle = {
  color: "white",
  textDeocration: "underline",
};

export const getLeftToolbar = (user_type: string): JSX.Element => {
  let leftToolbar: JSX.Element = <></>;
  let logoItem: JSX.Element = (
    <li>
      <img src={logo} alt="logo" />
    </li>
  );
  let helpItem: JSX.Element = (
    <li>
      <NavLink
        to="/help"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        Help
      </NavLink>
    </li>
  );
  let newTicketItem: JSX.Element = (
    <li>
      <NavLink
        to="/newticket"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        Create new ticket
      </NavLink>
    </li>
  );
  let editTicketItem: JSX.Element = (
    <li>
      <NavLink
        to="/editticket"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        Edit ticket
      </NavLink>
    </li>
  );

  switch (user_type) {
    case "client":
      leftToolbar = (
        <ul>
          {logoItem}
          {newTicketItem}
          {helpItem}
        </ul>
      );
    case "client-admin":
      leftToolbar = (
        <ul>
          {logoItem}
          {newTicketItem}
          {editTicketItem}
          {helpItem}
        </ul>
      );
    case "support":
      leftToolbar = (
        <ul>
          {logoItem}
          {newTicketItem}
          {editTicketItem}
          {helpItem}
        </ul>
      );
    case "admin":
      leftToolbar = <></>;
    default:
      leftToolbar = <></>;
  }
  return leftToolbar;
};
