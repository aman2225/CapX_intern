// import React from "react";
import ResponsiveAppBar from "./components/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
const App = () => {
  return (
    <div className="dark:bg-black min-h-screen pt-10">
      {/* <Navbar /> */}
      <ResponsiveAppBar/>
      <Dashboard />
    </div>
  );
};

export default App;
