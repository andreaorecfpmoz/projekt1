import React, { useState } from 'react';
import './navbar.css';
import HomeIcon from '../../styles/icons/svg/HomeIcon.svg';
import WeddingSalonIcon from '../../styles/icons/svg/WeddingSalonIcon.svg';
import SeatingArrangementIcon from '../../styles/icons/svg/SeatingArrangementIcon.svg';
import ProfileIcon from '../../styles/icons/svg/ProfileIcon.svg';
import ContactIcon from '../../styles/icons/svg/ContactIcon.svg';
import CheckoutIcon from '../../styles/icons/svg/CheckoutIcon.svg';
import { NavLink } from 'react-router-dom';

export default function Navbar(props) {
  const [navExpanded, setNavExpanded] = useState(false);

  return (
    <div className='navbarComponent'>
      <nav className='navbar navbar-expand-lg '>
        <div className='container-fluid'>
          <button
            className='navbar-toggler'
            type='button'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setNavExpanded(!navExpanded)}
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <h2 className='card-title navbarHeader'>Wedease</h2>
        </div>
        <div className='navbarContainer'>
          <ul className='navbarLinks'>
            <NavLink
              to='/'
              className='navItemBig btn'
              activeClassName='activeNav'
            >
              Početna
            </NavLink>
            <NavLink
              to='/Svadbeni_saloni'
              className='navItemBig btn'
              activeClassName='activeNav'
            >
              {props.autentification.isGuest
                ? 'Svadbeni salon'
                : 'Svadbeni saloni'}
            </NavLink>
            <NavLink
              to='/Raspored_sjedenja'
              className='navItemBig btn'
              activeClassName='activeNav'
            >
              {props.autentification.isAdmin
                ? 'Unos stolova'
                : 'Raspored sjedenja'}
            </NavLink>
          
            <NavLink
              to='/login'
              className='navItemBig btn'
              activeClassName='activeNav'
            >
              Odjava
            </NavLink>
          </ul>
        </div>
      </nav>
      {navExpanded && (
        <div className='mobileNavbarContainer'>
          <ul className='navLinks'>
            <NavLink to='/' className='navItem btn' activeClassName='activeNav'>
              {' '}
              Početna <img src={HomeIcon} alt='' className='navBtnIcon' />
            </NavLink>
            <NavLink
              to='/Svadbeni_saloni'
              className='navItem btn'
              activeClassName='activeNav'
            >
              {props.autentification.isGuest
                ? 'Svadbeni salon'
                : 'Svadbeni saloni'}
              <img src={WeddingSalonIcon} alt='' className='navBtnIcon' />
            </NavLink>
            <NavLink
              to='/Raspored_sjedenja'
              className='navItem btn'
              activeClassName='activeNav'
            >
              {props.autentification.isAdmin
                ? 'Unos stolova'
                : 'Raspored sjedenja'}
              <img src={SeatingArrangementIcon} alt='' className='navBtnIcon' />
            </NavLink>
            {props.autentification.isGuest && (
              <NavLink
                to='/Kontakt'
                className='navItemBig btn'
                activeClassName='activeNav'
              >
                Kontakt
                <img src={ContactIcon} alt='' className='navBtnIcon' />
              </NavLink>
            )}

            <NavLink
              to='/login'
              className='navItem btn'
              activeClassName='activeNav'
            >
              {' '}
              Odjava <img src={CheckoutIcon} alt='' className='navBtnIcon' onClick={props.logoutUser}/>
            </NavLink>
          </ul>
        </div>
      )}
    </div>
  );
}
