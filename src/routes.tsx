import { createBrowserRouter, Navigate } from "react-router-dom";
//CUSTOM COMPONENTS
import App from "./App";
import LoginPage from "./components/LoginPage/LoginPage";
import HelpPage from "./components/HelpPage/HelpPage";
import Ticket from "./components/Ticket/Ticket";
import ClientDashboard from "./components/Dashboards/ClientDashboard";
import NewTicket from "./components/NewTicket/NewTicket";
import AdminDashboard from "./components/Dashboards/AdminDashboard";
import SupportDashboard from "./components/Dashboards/SupportDashboard";
import AllClients from "./components/adminActions/AllClients";
import NewClient from "./components/adminActions/NewClient";
import AllProjects from "./components/adminActions/AllProjects";
import AllCompanies from "./components/adminActions/AllCompanies";
import Connections from "./components/adminActions/Connections"
//LOCAL HELPERS
import { isAuthenticated } from "./interfaces";
import { useAppSelector } from "./app/hooks";
import { RootState } from "./app/store";


const CheckIsAuthenticated: React.FC<isAuthenticated> = ({
  component: Component,
}) => {
  const token = useAppSelector((state: RootState) => state.user.JWT);
  const user = useAppSelector((state: RootState) => state.user.userData)
  if (token) return <Component />;

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
        path: "/allcompanies",
        element: <CheckIsAuthenticated component={AllCompanies} />,
      },
      {
        path: "/connections",
        element: <CheckIsAuthenticated component={Connections} />,
      },
    ],
  },
]);
