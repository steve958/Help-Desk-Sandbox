import { Toolbar } from "@mui/material";

const Dashboard = () => {
  //toolbar je sastavni deo svakog dashboarda, tako da bi informaciju o tipu toolbara mozda trebalo proslediti preko propsa, to cu dodati
  return (
    <div className="app_container">
      <Toolbar />
      <div className="content_container"></div>
    </div>
  );
};

export default Dashboard;
