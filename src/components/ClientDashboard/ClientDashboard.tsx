import Toolbar from "../Toolbar/Toolbar";
import "./ClientDashboard.css";
import ClientTable from "../Table/ClientTable";
import ClientFilters from "../Filters/ClientFilters";
import ClientAdminTable from "../Table/ClientAdminTabe";
import ClientAdminFilters from "../Filters/ClientAdminFilters";

let role = 'client_admin'

const Dashboard = () => {
  //toolbar je sastavni deo svakog dashboarda, tako da bi informaciju o tipu toolbara mozda trebalo proslediti preko propsa, to cu dodati
  return (
    <div className="app_container">
      <Toolbar />
      <div className="content_container">
        <h3 className="headings">Filters</h3>
        <div className="filter_container">
          {role === 'client' ? <ClientFilters /> : <ClientAdminFilters />}
        </div>
        <h3>Your Tickets</h3>
        <div className="table_container">
          {role === 'client' ? <ClientTable /> : <ClientAdminTable />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
