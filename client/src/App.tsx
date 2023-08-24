import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import ChartsAndMaps from './Components/ChartsAndMaps';
import Contacts from './Components/Contacts';
import Dashboard from './Components/Dashboard';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex">
        {/* Sidebar Component */}
        <Sidebar />

        {/* Routing */}
        <Routes>
          {/* Dashboard Route */}
          <Route path="/" element={<Dashboard/>} />

          {/* Contacts Route */}
          <Route path="/contacts" element={<Contacts/>} />

          {/* Charts and Maps Route */}
          <Route path="/charts-and-maps" element={<ChartsAndMaps/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;