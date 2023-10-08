import { JSX, useEffect, useState } from 'react'
import { BrowserRouter } from "react-router-dom";

import { Navbar } from './components';
import MoonCanvas from './components/scene/MoonCanvas';
import Sidebar from './components/Sidebar/Sidebar';
import PSEContext from './utils/PSEContext';
import extractPSEData from './utils/DataConverter';

const App = (): JSX.Element => {
  const [data, setData] = useState(null);

  useEffect(() => {
    extractPSEData()
      .then((xmlData) => {
        setData(xmlData.children.find(child => child.name === "Network"));
      });
  }, []);

  return (
    <PSEContext.Provider value={data}>
      <BrowserRouter>
        <div className="relative z-0 bg-primary">
          <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
            <Navbar />
            <Sidebar />
            <MoonCanvas />
          </div>
        </div>
      </BrowserRouter>
    </PSEContext.Provider>
  )
}

export default App;
