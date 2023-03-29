import { createBrowserRouter, Navigate, useLocation } from "react-router-dom";

import App from "./App";
import LoginPage from "./components/LoginPage/LoginPage";
import EditTicket from "./components/EditTicket/EditTicket";
import HelpPage from "./components/HelpPage/HelpPage";
import TicketDetail from "./components/TicketDeatil/TicketDetail";
import ClientDashboard from "./components/ClientDashboard/ClientDashboard";
import NewTicket from "./components/NewTicket/NewTicket";
import { useSelector } from "react-redux";

//import { state } from "./index";
//import { isAuthenticated } from "./interfaces";

// Da NAPRAVIM ZASTICENE RUTE DOK NAPRAVIM AUTH REDUCER  -> sve rute sem login ce biti zasticene
// const CheckIsAuthenticated: React.FC<isAuthenticated> = ({
//   component: Component,
// }) => {
//   const authState = useSelector((state: state) => state.auth);
//   if (authState["token"] !== null) return <Component />;

//   return <Navigate to="/" replace />;
// };

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
        //element: <CheckIsAuthenticated component={Favourites} />,
        element: <HelpPage />,
      },
      {
        path: "/clientdashboard",
        element: <ClientDashboard />,
      },
      {
        path: "/editticket",
        element: <EditTicket />,
      },
      {
        path: "/ticket:id",
        element: <TicketDetail />,
      },
      {
        path: "/newticket",
        element: <NewTicket />,
      },
    ],
  },
]);
