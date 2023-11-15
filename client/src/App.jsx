import React, { useState } from 'react';
import './index.css';
import SignupForm from './Registration';
import LoginForm from './Login';
import Index from './Index'
import Secret from './Secret'
import {BrowserRouter, Routes,Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/register' element={<SignupForm/>}></Route>
      <Route path='/login' element={<LoginForm/>}></Route>
      <Route path='/todo' element={<Index/>}></Route>
      <Route path='/Secret' element={<Secret/>}></Route>
      <Route path='/' element={<SignupForm/>}></Route>
      
    </Routes>
    </BrowserRouter>
  );
}

export default App;

