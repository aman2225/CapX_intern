
// // import React from "react";
// import Example from "./components/Navbar";
// import Dashboard from "./components/Dashboard/Dashboard";
// import data from "./data/data.json";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Card from "./components/card";
// import { FooterWithSitemap } from "./components/footer";
// import { DrawCircleText } from "./components/text";
// import C from "./components/slider";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// const MainLayout = () => {
//   return (
//     <div className="dark:bg-black min-h-screen pt-10 bg-black">
//       {/* Navbar */}
//       <Example />

//       {/* Slider Component */}
//       <C start={data.banner.start} />

//       {/* Other Components */}
//       <DrawCircleText />
//       <Card />
//       <FooterWithSitemap />
//     </div>
//   );
// };

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* Main Layout Routes */}
//         <Route path="/" element={<MainLayout />} />

//         {/* Dashboard Route */}
//         <Route path="/dashboard" element={<Dashboard />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;


import React from "react";
import Example from "./components/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import data from "./data/data.json";
import Card from "./components/card";
import { FooterWithSitemap } from "./components/footer";
import { DrawCircleText } from "./components/text";
import C from "./components/slider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-black text-white pt-10">
      {/* Navbar */}
      <Example />

      {/* Slider Component */}
      <C start={data.banner.start} />

      {/* Other Components */}
      <DrawCircleText />
      <Card />
      <FooterWithSitemap />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Main Layout Routes */}
        <Route path="/" element={<MainLayout />} />

        {/* Dashboard Route */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
