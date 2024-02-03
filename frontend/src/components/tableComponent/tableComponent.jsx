import React, { useState } from 'react';
import './tableComponent.css';

export default function TableComponent({ table, onReserveSeats }) {
  const [guestNames, setGuestNames] = useState({});

  const handleNameChange = (seatNumber, name) => {
    // Make sure that table.IDStola is not undefined
    if (typeof table.IDStola !== 'undefined') {
      setGuestNames({
        ...guestNames,
        [`${table.IDStola}-${seatNumber}`]: name,
      });
    } else {
      console.error('table.IDStola is undefined');
    }
  };

  const reserveHandler = () => {
    onReserveSeats(table.IDStola, guestNames);
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>Stolica</th>
            <th style={{ textAlign: 'center' }}>Rezerviraj</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: table.BrojStolica }, (_, index) => {
            const seatNumber = index + 1;
            const guestForSeat = table.guests?.find(
              (guest) => guest.seat === seatNumber
            );
            return (
              <tr key={`${table.IDStola}-${seatNumber}`}>
                <td>{`Sjedalo ${seatNumber}`}</td>
                <td>
                  {guestForSeat ? (
                    <div className='rezervationName'>{guestForSeat.name}</div>
                  ) : (
                    <input
                      type='text'
                      value={guestNames[`${table.IDStola}-${seatNumber}`] || ''}
                      onChange={(e) =>
                        handleNameChange(seatNumber, e.target.value)
                      }
                      placeholder='Upišite ime i prezime'
                      className='rezervationInput'
                    />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className='hiperLine'></div>
      <button className='tableRezervationBtn' onClick={reserveHandler}>
        Rezerviraj
      </button>
    </>
  );
}
