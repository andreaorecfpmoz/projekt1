import './App.css';
import LoginPage from './pages/loginPage/loginPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SingUpPage from './pages/singUpPage/singUpPage';
import HomePage from './pages/homePage/homePage';
import WeddingSalonPage from './pages/weddingSalonPage/weddingSalonPage';
import SeatingArrangementPage from './pages/seatingArrangementPage/seatingArrangementPage';

import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import LoginGost from './pages/loginPage/loginGost';

function App() {
  const [autentification, setAutentification] = useState({
    isAdmin: false,
    isNewlyweds: true,
    isGuest: false,
  });
  const [currentUser, setCurrentUser] = useState(null);

  const loginUser = (userData) => {
    setCurrentUser(userData);
    console.log(userData);
    if (userData.user.uloga === 'Mladenci') {
      setAutentification((prevState) => ({
        isAdmin: false,
        isNewlyweds: true,
        isGuest: false,
      }));
    } else if (userData.user.uloga === 'Gost') {
      setAutentification((prevState) => ({
        isAdmin: false,
        isNewlyweds: false,
        isGuest: true,
      }));
    } else if (userData.user.uloga === 'Administrator') {
      setAutentification((prevState) => ({
        isAdmin: true,
        isNewlyweds: false,
        isGuest: false,
      }));
    }
  };

  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path='/login' element={<LoginPage loginUser={loginUser} />} />
          <Route
            path='/loginGost'
            element={<LoginGost loginUser={loginUser} />}
          />
          <Route
            path='/singup'
            element={<SingUpPage loginUser={loginUser} />}
          />
          <Route
            path='/'
            element={
              currentUser ? (
                <HomePage
                  autentification={autentification}
                  logoutUser={logoutUser}
                />
              ) : (
                <Navigate to='/login' />
              )
            }
          />
          <Route
            path='/Svadbeni_saloni'
            element={
              currentUser ? (
                <WeddingSalonPage
                  autentification={autentification}
                  logoutUser={logoutUser}
                />
              ) : (
                <Navigate to='/login' />
              )
            }
          />
          <Route
            path='/Raspored_sjedenja'
            element={
              currentUser ? (
                <SeatingArrangementPage
                  autentification={autentification}
                  logoutUser={logoutUser}
                />
              ) : (
                <Navigate to='/login' />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
