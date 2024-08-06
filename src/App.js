import React from 'react';
import {Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import LoginPage from './components/Login';

function App() {
  return (

      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/login" element={<LoginPage/>} />
      </Routes>

  );
}

export default App;
