import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Stock from './pages/Stock';
import Contact from './pages/Contact';
import Feedback from './pages/Feedback';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from './redux/loginSlice';

function App() {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Fetch the user email and token from local storage
    const user = JSON.parse(localStorage.getItem('user'))

    // If the token/email does not exist, mark the user as logged out
    if (!user || !user.token) {
      dispatch(logout())
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
        if('success' === r.message) dispatch(login())
        else dispatch(logout())
        setUsername(user.username || '')
      })
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout username={username} />}>
            {/*  'index' prop indicates that its element prop should only be rendered when the current URL path exactly matches the path prop of its parent <Route> component. */}
            <Route index element={<Home username={username} />} />
            <Route path="/login" element={<Login setUsername={setUsername} />} />
            <Route path="/register" element={<Register />} />

            <Route element={<PrivateRoute />}>
              <Route path="/contact" element={<Contact />} />
              <Route path="/stock" element={<Stock />} />
              <Route path="/feedback" element={<Feedback />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
