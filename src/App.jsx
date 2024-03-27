import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar';
import Search_Tags from './Components/Search_Tags';
import Jobs from './Components/Jobs';
import GlobalContextData from './Context/GlobalContext';


function App() {

  return (
    <>
      <GlobalContextData>
        <div>
          <Navbar />
          <Search_Tags />
          <Jobs />
        </div>
      </GlobalContextData>
    </>
  )
}

export default App
