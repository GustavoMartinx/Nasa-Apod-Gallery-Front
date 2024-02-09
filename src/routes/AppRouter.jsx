import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeFeedPage from '../pages/HomeFeed.jsx';
import LoginPage from '../pages/Login.jsx';
import LogupPage from '../pages/Logup.jsx';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/logup" element={<LogupPage/>} />
        <Route path="/" element={<HomeFeedPage/>} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
