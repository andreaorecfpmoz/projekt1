import React, {useState} from 'react';
import './homePage.css';
import logo from '../../styles/icons/logo.png';
import Navbar from '../../components/navigation/navbar';

export default function HomePage(props) {

  return (
    <>
      <Navbar autentification={props.autentification} logoutUser={props.logoutUser}/>

      <div className='homePage'>
        <div className='text-center homePage-appLogo'>
          <img src={logo} alt='Wedease Logo' className='mb-4' />
          <h2 className='card-title header'>Wedease</h2>
        </div>
        <p className='homePageText'>“Happily ever after starts here 2 2 ”</p>
      </div>
    </>
  );
}
