import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NaviBar';
import PrivateRoute from './components/PrivateRoute';
import Stock from './components/Stock';
import Contact from './components/Contact';
import Feedback from './components/Feedback';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Fetch the user email and token from local storage
    const user = JSON.parse(localStorage.getItem('user'))
  
    // If the token/email does not exist, mark the user as logged out
    if (!user || !user.token) {
      setLoggedIn(false)
      return
    }
  
    // If the token exists, verify it with the auth server to see if it is valid
    fetch('http://localhost:3080/verify', {
      method: 'POST',
      headers: {
        'jwt-token': user.token,
      },
    })
      .then((r) => r.json())
      .then((r) => {
        setLoggedIn('success' === r.message)
        setUsername(user.username || '')
      })
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <NavigationBar username={username} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Routes>
          <Route path="/" element={<Home username={username} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setUsername={setUsername}/>} />
          <Route path="/register" element={<Register/>} />

          <Route element={<PrivateRoute loggedIn={loggedIn}/>}>
            <Route path="/contact" element={<Contact />} />
            <Route path="/stock" element={<Stock />} />
            <Route path="/feedback" element={<Feedback/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
