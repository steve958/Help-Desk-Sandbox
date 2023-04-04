import { NavLink } from "react-router-dom";
import logo from "../assets/comdata.png";

let activeStyle = {
  color: "white",
  textDeocration: "underline",
};

export const getLeftToolbar = (user_type: string): JSX.Element => {
  let leftToolbar: JSX.Element = <></>;
  let logoItem = (
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

  switch (user_type) {
    case "Client":
      leftToolbar = (
        <ul>
          {logoItem}
          {newTicketItem}
          {helpItem}
        </ul>
      );
      break;
    case "Client_Admin":
      leftToolbar = (
        <ul>
          {logoItem}
          {newTicketItem}
          {helpItem}
        </ul>
      );
      break;
    case "Support":
      leftToolbar = (
        <ul>
          {logoItem}
          {helpItem}
        </ul>
      );
      break;
    case "Admin":
      leftToolbar = <ul>{logoItem}</ul>;
      break;
    default:
      leftToolbar = <></>;
  }
  return leftToolbar;
};

//dodati fju za odredjivanje role