import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './routes/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import SearchResults from './routes/SearchResults';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path='search/:word' element={<SearchResults />} />
      </Route>
    </Routes>
  );
}

export default App;
