import { createBrowserRouter, Navigate, useLocation } from "react-router-dom";
import App from "./App";
import LoginPage from "./components/LoginPage/LoginPage";
import HelpPage from "./components/HelpPage/HelpPage";
import Ticket from "./components/tickets/Ticket/Ticket";
import ClientDashboard from "./components/Dashboards/ClientDashboard";
import NewTicket from "./components/tickets/NewTicket/NewTicket";
import AdminDashboard from "./components/Dashboards/AdminDashboard";
import SupportDashboard from "./components/Dashboards/SupportDashboard";
import { useSelector } from "react-redux";
import { state } from "./main";
import { isAuthenticated } from "./interfaces";
import AllTickets from "./components/tickets/AllTickets/AllTickets";
import AllSupport from "./components/adminActions/AllSupport";
import NewSupport from "./components/adminActions/NewSupport";
import AllClients from "./components/adminActions/AllClients";
import NewClient from "./components/adminActions/NewClient";
import AllProjects from "./components/adminActions/AllProjects";
import NewProject from "./components/adminActions/NewProject";
import AllCompanies from "./components/adminActions/AllCompanies";
import NewCompany from "./components/adminActions/NewCompany";

const CheckIsAuthenticated: React.FC<isAuthenticated> = ({
  component: Component,
}) => {
  const authState = useSelector((state: state) => state.auth);
  // if (authState["token"] !== null) return <Component />;
  return <Component />;

  //return <Navigate to="/" replace />;
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
        path: "/ticket/:id",
        element: <CheckIsAuthenticated component={Ticket} />,
      },
      {
        path: "/newticket",
        element: <CheckIsAuthenticated component={NewTicket} />,
      },
      {
        path: "/supportdashboard",
        element: <CheckIsAuthenticated component={SupportDashboard} />,
      },
      {
        path: "/admindashboard",
        element: <CheckIsAuthenticated component={AdminDashboard} />,
      },
      {
        path: "/alltickets",
        element: <CheckIsAuthenticated component={AllTickets} />,
      },
      {
        path: "/allsupport",
        element: <CheckIsAuthenticated component={AllSupport} />,
      },
      {
        path: "/newsupport",
        element: <CheckIsAuthenticated component={NewSupport} />,
      },
      {
        path: "/allclients",
        element: <CheckIsAuthenticated component={AllClients} />,
      },
      {
        path: "/newclient",
        element: <CheckIsAuthenticated component={NewClient} />,
      },
      {
        path: "/allprojects",
        element: <CheckIsAuthenticated component={AllProjects} />,
      },
      {
        path: "/newproject",
        element: <CheckIsAuthenticated component={NewProject} />,
      },
      {
        path: "/allcompanies",
        element: <CheckIsAuthenticated component={AllCompanies} />,
      },
      {
        path: "/newcompany",
        element: <CheckIsAuthenticated component={NewCompany} />,
      },
    ],
  },
]);
