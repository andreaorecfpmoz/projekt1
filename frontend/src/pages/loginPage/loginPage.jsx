import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './loginPage.css';
import logo from '../../styles/icons/logo.png';

export default function LoginPage(props) {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    lozinka: '',
  });
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials({ ...credentials, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(false);
      const response = await fetch('http://wedease.studenti.sum.ba/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        props.loginUser(data);
        localStorage.setItem('user', JSON.stringify(data));

        navigate('/');
      } else {
        setError(true);
        throw new Error('Failed to login');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className='container'>
      <div className='row justify-content-center align-items-center vh-100'>
        <div className='text-center logo'>
          <img src={logo} alt='Wedease Logo' className='mb-4' />
          <h2 className='card-title headerLogin'>Wedease</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <input
              type='text'
              className={`form-control ${error ? 'error' : ''}`}
              id='email'
              placeholder='Email'
              value={credentials.email}
              onChange={handleChange}
       
              required
            />
          </div>
          <div className='mb-3'>
            <input
              type='password'
              className={`form-control ${error ? 'error' : ''}`}
              id='lozinka'
              placeholder='Lozinka'
              value={credentials.lozinka}
              onChange={handleChange}
              required
            />
          </div>
          <div className='d-grid'>
            <button type='submit' className='loginBtn btn'>
              Prijava
            </button>
          </div>
        </form>
        <div className='text-center bottom'>
          <div className='bottomBtns'>

        <div className='btn hipperLink gostBtn' onClick={() => navigate('/loginGost')}>
            Gost
          </div>
          <div className='btn hipperLink' onClick={() => navigate('/singup')}>
            Izradite korisnički račun
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
