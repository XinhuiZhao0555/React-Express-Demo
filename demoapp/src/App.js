import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NaviBar';

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
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login users={users} setLoggedIn={setLoggedIn} setUsername={setUsername}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
