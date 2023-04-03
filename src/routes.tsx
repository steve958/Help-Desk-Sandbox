import { createBrowserRouter, Navigate, useLocation } from "react-router-dom";

import App from "./App";
import LoginPage from "./components/LoginPage/LoginPage";
import EditTicket from "./components/EditTicket/EditTicket";
import HelpPage from "./components/HelpPage/HelpPage";
import TicketDetail from "./components/TicketDeatil/TicketDetail";
import ClientDashboard from "./components/Dashboards/ClientDashboard";
import NewTicket from "./components/NewTicket/NewTicket";
import { useSelector } from "react-redux";

import { state } from "./main";
import { isAuthenticated } from "./interfaces";

const CheckIsAuthenticated: React.FC<isAuthenticated> = ({
  component: Component,
}) => {
  const authState = useSelector((state: state) => state.auth);
  // if (authState["token"] !== null) return <Component />;
  return <Component />;

  return <Navigate to="/" replace />;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LoginPage />,
      },
      {
        path: "/help",
        element: <CheckIsAuthenticated component={HelpPage} />,
      },
      {
        path: "/clientdashboard",
        element: <CheckIsAuthenticated component={ClientDashboard} />,
      },
      {
        path: "/editticket",
        element: <CheckIsAuthenticated component={EditTicket} />,
      },
      {
        path: "/ticket:id",
        element: <CheckIsAuthenticated component={TicketDetail} />,
      },
      {
        path: "/newticket",
        element: <CheckIsAuthenticated component={NewTicket} />,
      },
    ],
  },
]);
