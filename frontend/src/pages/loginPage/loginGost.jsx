import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './loginPage.css';
import logo from '../../styles/icons/logo.png';

export default function LoginGost(props) {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    imePrezime: '',
    email: '',
    brojPozivnice: '',
    uloga: 'Gost'
  });
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        setError(false);
      const response = await fetch('http://localhost:3000/users/loginGost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        setError(true);

        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      props.loginUser(data);
    
      localStorage.setItem('user', JSON.stringify(data));

      navigate('/');
    } catch (error) {
      console.error('Error during guest login:', error);
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
              placeholder='Ime i prezime'
              name='imePrezime'
              value={credentials.imePrezime}
              onChange={handleChange}
            />
          </div>

          <div className='mb-3'>
            <input
              type='email'
              className={`form-control ${error ? 'error' : ''}`}
              name='email'
              placeholder='Email'
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className='mb-3'>
            <input
              type='text'
              className={`form-control ${error ? 'error' : ''}`}
              name='brojPozivnice'
              placeholder='Broj Pozivnice'
              value={credentials.brojPozivnice}
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
          <div className='btn hipperLink' onClick={() => navigate('/singup')}>
            Izradite korisnički račun
          </div>
        </div>
      </div>
    </div>
  );
}
