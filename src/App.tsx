import { JSX } from 'react'
import { BrowserRouter } from "react-router-dom";

import { About, Navbar } from './components';
import MoonCanvas from './components/scene/MoonCanvas';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <MoonCanvas />
        </div>
        {/* <About /> */}
      </div>
    </BrowserRouter>
  )
}


export default App;
