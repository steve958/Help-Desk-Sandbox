import Toolbar from "../Toolbar/Toolbar";
import "./ClientDashboard.css";
import DataTable from "../Table/DataTable";
import ClientFilters from "../Filters/ClientFilters";

const Dashboard = () => {
  //toolbar je sastavni deo svakog dashboarda, tako da bi informaciju o tipu toolbara mozda trebalo proslediti preko propsa, to cu dodati
  return (
    <div className="app_container">
      <Toolbar />
      <div className="content_container">
        <h3>Filters</h3>
        <div className="filter_container">
          <ClientFilters />
        </div>
        <h3>Your Tickets</h3>
        <div className="table_container">
          <DataTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
