import { useContext, useEffect, useState } from "react";

import { AxiosResponse } from "axios";
import "./App.css";
import Header from "./components/Header";
import { Context } from "./context/context";
import SearchHero from './components/SearchHero';
import HeroList from './components/HeroList';

import { dependencies } from './context/dependencies';

function App() {
  const [pageCount, setPageCount] = useState(0)

  return (
    <Context.Provider value={{...dependencies, pageCount, setPageCount}}>

    <div className="App w-screen p-0">
      <Header />
      <div className='utilArea'>
        <SearchHero  />
        <HeroList  />
      </div>
    </div>
    </Context.Provider>
  );
}

export default App;
