import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar';
import Jobs from './Components/Jobs';
import GlobalContextData from './Context/GlobalContext';
import Footer from './Components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchTagsResults from './Components/SearchTagsResults';
import SearchGeoResults from './Components/SearchGeoResult';


function App() {

  return (
    <>
      <GlobalContextData>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Jobs />} />
            <Route path="/location/:location" element={<SearchGeoResults />} />
            <Route path="/title/:title" element={<SearchTagsResults />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </GlobalContextData>
    </>
  )
}

export default App
