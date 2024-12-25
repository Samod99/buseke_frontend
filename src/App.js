import { useState } from 'react'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/Home'; // Ensure this path is correct
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import EmailVerify from './Pages/EmailVerify';
import './App.css';
import ResetPassword from './Pages/ResetPassword';
import Account from './Pages/Admin/Account'
import Profile from './Pages/Operator/profile';
import Timetable from './Pages/timetable';
import Reservation from './Pages/reservation';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Email-verify" element={<EmailVerify />} />
      <Route path="/Reset-password" element={<ResetPassword />} />
      <Route path="/admin/account" element={<Account />} />
      <Route path="/operartor/account" element={<Profile />} />
      <Route path="/timetable" element={<Timetable />} />
      <Route path="/reservation" element={<Reservation />} />

    </Routes>
  );
}

export default App;