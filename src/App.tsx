import { Outlet } from "react-router-dom"
import { useState, useEffect } from "react";

function App() {
  return (
    <div className="app_container">
      <Outlet />
    </div>
  );
}

export default App;
