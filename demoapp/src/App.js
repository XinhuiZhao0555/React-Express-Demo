import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NaviBar';
import PrivateRoute from './components/PrivateRoute';
import Stock from './components/Stock';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const users = [
    {
      username:'admin',
      email:'admin@gmail.com',
      password:'admin123'
    }
  ];

  return (
    <div className="App">
      <BrowserRouter>
        <NavigationBar username={username} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Routes>
          <Route element={<PrivateRoute loggedIn={loggedIn}/>}>
            <Route path="/home" element={<Home />} />
            <Route path="/stock" element={<Stock />}/>
          </Route>
          <Route path="/login" element={<Login users={users} setLoggedIn={setLoggedIn} setUsername={setUsername}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
