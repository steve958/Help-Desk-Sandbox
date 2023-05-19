import { NavLink } from "react-router-dom";
import logo from "../assets/help_desk_logo_3.png";
import { User } from "../interfaces";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";

let activeStyle = {
  color: "white",
  textDeocration: "underline",
};

export const getLeftToolbar = (user_type: string): JSX.Element => {
  const user = useAppSelector((state: RootState) => state.user.userData)
  function navigationProvider(id: number) {
    switch (id) {
      case 1:
        return "admindashboard";
        break;
      case 2:
        return "supportdashboard"
        break;
      default:
        return "clientdashboard"
        break;
    }
  }
  let leftToolbar: JSX.Element = <></>;
  let logoItem = (
    <li>
      <NavLink to={`/${navigationProvider(user.userType.userTypeId)}`}>
        <img src={logo} alt="logo" />
      </NavLink>
    </li>
  );
  let helpItem: JSX.Element = (
    <li>
      <NavLink
        to="/help"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        Pomoć
      </NavLink>
    </li>
  );
  let newTicketItem: JSX.Element = (
    <li>
      <NavLink
        to="/newticket"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        Kreiraj nov tiket
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

export const searchClientUsers = (clients: User[], query: string): User[] => {
  if (query !== "")
    return clients.filter((x) => x.username.toLowerCase().includes(query));
  else {
    return clients;
  }
};

