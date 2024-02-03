import React, { useState, useEffect } from 'react';
import './chooseSalon.css';

export default function ShooseSalon(props) {
  const [allSalons, setAllSalons] = useState([]);
  const [dropdown, setDropdown] = useState(false);
  const [salon, setSalon] = useState()



  useEffect(() => {
    fetch('http://localhost:3000/svadbeniSaloni/get')
      .then((response) => response.json())
      .then((data) => {
        setAllSalons(data);

      })
      .catch((error) => {
        console.error('Error fetching wedding salons', error);
      });
  }, []);

  const chooseDropdownHandler = () => {
    setDropdown(!dropdown);
  };

  useEffect(()=> {
    if(salon) {
        props.getSalon(salon)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[salon])

  return (
    <div className='chooseSalonContainer'>
      <div className='dropdown'>
        <div
          className='btn dropdown-toggle chooseDropdown'
          onClick={chooseDropdownHandler}
          href='#'
          role='button'
          data-bs-toggle='dropdown'
          aria-expanded='false'
        >
          {salon ? <span className='textInDropdown'>{salon.NazivSalona}</span> : <span className='textInDropdown'>Izaberi Salon</span>}
        </div>
      {dropdown && 
      <div className='dropdownMenu'>
        {allSalons && allSalons.map((salon)=> {
            return (
                <div className='dropdownItem' onClick={()=>{setSalon(salon); setDropdown(false)} }>{salon.NazivSalona}</div>
            )
        })}
      </div>
      
      }
      </div>
    </div>
  );
}
