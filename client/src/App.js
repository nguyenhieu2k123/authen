import React from 'react';
import { Container } from '@material-ui/core';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const App = () => (
  <BrowserRouter>
    <GoogleOAuthProvider clientId="769876265273-6he9ou0a3b6qrn57n7ltf4t0qps8693g.apps.googleusercontent.com">
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="auth" exact element={<Auth />} />
        </Routes>

      </Container>
    </GoogleOAuthProvider>
  </BrowserRouter>
);

export default App;
