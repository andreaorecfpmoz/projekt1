import React, { useState } from 'react';
import './singUpPage.css';
import logo from '../../styles/icons/logo.png';
import { useNavigate } from 'react-router-dom';

export default function SingUpPage(props) {
  const [formData, setFormData] = useState({
    imePrezime: '',
    imePrezimePartnera: '',
    email: '',
    lozinka: '',
    grad: '',
    uloga: 'Mladenci',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const updatedFormData = { ...formData, [e.target.name]: e.target.value };
    console.log('Updated Form Data:', updatedFormData); 
    setFormData(updatedFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem('user');

      const response = await fetch('http://localhost:3000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const result = await response.json();
        props.loginUser(result);

        localStorage.setItem('user', JSON.stringify(result));
        
        navigate('/');
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('There was an error submitting the form', error);
    }
  };

  return (
    <div className='container'>
      <div className='innerContainer'>
        <div className='text-center appLogo'>
          <img src={logo} alt='Wedease Logo' className='mb-4' />
          <h2 className='card-title headerLogin'>Wedease</h2>
        </div>
        <form className=' p-4 rounded' onSubmit={handleSubmit}>
          <div className='text-center  justify-content-center'>
            <div className='inputFiledBig' role='group' aria-label='User type'>
              <input type='button' className='btn ' value='MLADA' />
              <div className='middleLine'> </div>
              <input type='button' className='btn' value='MLADOŽENJA' />
            </div>
          </div>
          <div className='mb-3'>
            <input
              type='text'
              className='form-control singupInputField'
              placeholder='Ime i prezime'
              name='imePrezime'
              value={formData.imePrezime}
              onChange={handleChange}
            />
          </div>
          <div className='mb-3'>
            <input
              type='text'
              className='form-control singupInputField'
              placeholder='Ime i prezime partnera'
              name='imePrezimePartnera'
              value={formData.imePrezimePartnera}
              onChange={handleChange}
            />
          </div>
          <div className='mb-3'>
            <input
              type='email'
              className='form-control singupInputField'
              placeholder='E-mail'
              name='email'
              value={formData.email}
              onChange={handleChange}
            />
            <small className='form-text text-muted'>
              Na E-mail će Vam biti poslate sve potrebne informacije.
            </small>
          </div>
          <div className='mb-3'>
            <input
              type='password'
              className='form-control singupInputField'
              placeholder='Lozinka'
              name='lozinka'
              value={formData.lozinka}
              onChange={handleChange}
            />
          </div>
          <div className='mb-3'>
            <input
              type='text'
              className='form-control singupInputField'
              placeholder='Grad'
              name='grad'
              value={formData.grad}
              onChange={handleChange}
            />
          </div>
          <div className='mb-3'>
            <select
              name='uloga'
              value={formData.uloga}
              onChange={handleChange}
              className='singupInputField selectValue'
            >
              <option value='Mladenci'>Mladenci</option>
              <option value='Administrator'>Administrator</option>
            </select>
          </div>
          <div className='mb-3 form-check'>
            <input
              type='checkbox'
              className='form-check-input'
              id='termsCheck'
            />
            <label className='form-check-label' htmlFor='termsCheck'>
              Uslovi korištenja
            </label>
          </div>
          <div className='text-center '>
            <button type='submit' className='btn singUpBtn'>
              Registruj se
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
