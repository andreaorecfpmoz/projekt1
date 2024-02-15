import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navigation/navbar';
import './weddingSalonPage.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function WeddingSalonPage(props) {
  const [addSalon, setAddSalon] = useState(false);
  const [salon, setSalon] = useState({
    nazivSalona: '',
    opis: '',
    adresa: '',
    kontakt: '',
    kapacitet: '',
    imageUrl: '',
    webPage: '',
  });
  const [selectedDates, setSelectedDates] = useState({});
  const [weddingSalons, setWeddingSalons] = useState([]);
  const [reservedDates, setReservedDates] = useState([]);
  const [idSalona, setIdSalona] = useState();
  const [guestSalon, setGuestSalon] = useState();
  const [gostDatum, setGostDatum] = useState();
  const [brojPozivnice, ssetBrojPozivnice] = useState();
  const [mladenci, setMladenci] = useState();

  useEffect(() => {
    fetch('http://wedease.studenti.sum.ba/svadbeniSaloni/get')
      .then((response) => response.json())
      .then((data) => {
        setWeddingSalons(data);
      })
      .catch((error) => {
        console.error('Error fetching wedding salons', error);
      });
  }, []);

  const handleDateChange = (date, salonId) => {
    setSelectedDates((prevDates) => ({ ...prevDates, [salonId]: date }));
  };

  const handleChange = (e) => {
    setSalon({ ...salon, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://wedease.studenti.sum.ba/svadbeniSaloni/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(salon),
    })
      .then((response) => response.json())
      .then((data) => {
        setAddSalon(false);

        setSalon({
          nazivSalona: '',
          opis: '',
          adresa: '',
          kontakt: '',
          kapacitet: '',
          imageUrl: '',
          webPage: '',
        });
      })
      .catch((error) => {
        console.error('Error adding new salon', error);
      });
  };

  const calendarOpen = (idSalona) => {
    setIdSalona(idSalona);
    console.log(idSalona);
    fetch(`http://wedease.studenti.sum.ba/rezervacije/get/${idSalona}`)
      .then((response) => response.json())
      .then((reservedDates) => {
        setReservedDates(reservedDates);
      })
      .catch((error) => {
        console.error('Error fetching reservations', error);
      });
  };

  const handleReservation = async (salonId) => {
    const selectedDate = selectedDates[salonId];

    if (!selectedDate) {
      alert('Molimo izaberite datum i salon za rezervaciju.');
      return;
    }

    const userLocalStorage = localStorage.getItem('user');
    if (!userLocalStorage) {
      alert('Niste prijavljeni.');
      return;
    }

    const user = JSON.parse(userLocalStorage);
    const userId = user.user.id;

    // Formatirajte odabrani datum u format koji server očekuje
    const formattedDate = [
      selectedDate.getFullYear(),
      ('0' + (selectedDate.getMonth() + 1)).slice(-2),
      ('0' + selectedDate.getDate()).slice(-2),
    ].join('-');

    try {
      const response = await fetch('http://wedease.studenti.sum.ba/rezervacije/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idSvadbenogSalona: salonId,
          idKorisnika: userId,
          datum: formattedDate,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setSelectedDates((prevDates) => {
        const newDates = { ...prevDates };
        delete newDates[salonId];
        return newDates;
      });
    } catch (error) {
      console.error('Error during reservation', error);
      alert('Došlo je do greške pri dodavanju rezervacije.');
    }
  };

  const excludeDates = reservedDates.reduce((acc, reservation) => {
    if (reservation.IDSvadbenogSalona === idSalona) {
      const dateParts = reservation.DatumRezervacije.split('.').map(Number);
      const date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
      acc.push(date);
    }
    return acc;
  }, []);

  useEffect(() => {
    const fetchReservations = async (reservationId) => {
      try {
        const response = await fetch(
          `http://wedease.studenti.sum.ba/rezervacije/get/korisnik/${reservationId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const rezervationData = await response.json();

        if (rezervationData.length > 0) {
          ssetBrojPozivnice(rezervationData[0].IDKorisnika);
          setGostDatum(rezervationData[0]?.DatumRezervacije);
          try {
            const response = await fetch(
              `http://wedease.studenti.sum.ba/users/get/${rezervationData[0]?.IDKorisnika}`
            );
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const userData = await response.json();
            setMladenci(userData);
          } catch (error) {
            console.error('Could not fetch salon details:', error);
          }
          try {
            const response = await fetch(
              `http://wedease.studenti.sum.ba/svadbeniSaloni/get/${rezervationData[0]?.IDSvadbenogSalona}`
            );
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const salonData = await response.json();
            setGuestSalon(salonData);
          } catch (error) {
            console.error('Could not fetch salon details:', error);
          }
        }
      } catch (error) {
        console.error('Error fetching reservations for user', error);
      }
    };

    const userLocalStorage = localStorage.getItem('user');

    const user = JSON.parse(userLocalStorage);

    if (user?.user?.uloga !== 'Administrator') {
      const brojPozivnice = user?.user?.brojPozivnice;

      if (brojPozivnice) {
        fetchReservations(brojPozivnice);
      }

      const brojRezervacije = user?.user?.id;

      if (brojRezervacije) {
        fetchReservations(brojRezervacije);
      }
    }
  }, [selectedDates]);

  return (
    <>
      <Navbar
        autentification={props.autentification}
        logoutUser={props.logoutUser}
      />

      {!addSalon ? (
        <div className='container weddingSalonContainer'>
          <div className='row'>
            {(!props.autentification.isGuest &&
              !gostDatum &&
              weddingSalons.map((salon) => (
                <div
                  key={salon.IDSalona}
                  className='col-lg-4 col-md-6 col-sm-12 mb-3'
                >
                  <div className='card justify-content-center align-items-center'>
                    <img
                      src={salon.ImageUrl}
                      className='card-img-top salonImage'
                      alt='Salon'
                    />
                    <div className='card-body cardBodyWeddingSalon'>
                      <h5 className='card-title'>{salon.NazivSalona}</h5>
                      <p className='card-text'>{salon.Opis}</p>
                      <p className='card-text'>
                        Broj sjedecih mjesta: {salon.Kapacitet}
                      </p>
                      {props.autentification.isNewlyweds && !gostDatum ? (
                        <>
                          <DatePicker
                            selected={selectedDates[salon.IDSalona]}
                            onCalendarOpen={() => calendarOpen(salon.IDSalona)}
                            onChange={(date) =>
                              handleDateChange(date, salon.IDSalona)
                            }
                            placeholderText='Vidi slobodne datume'
                            dateFormat='dd.MM.yyyy'
                            minDate={new Date()}
                            excludeDates={excludeDates}
                          />
                        </>
                      ) : (
                        <>
                          {!props.autentification.isAdmin && (
                            <>
                              <div className='rezervationDate'>{gostDatum}</div>
                              <div className='rezervationDate'>
                                {gostDatum
                                  ? `Broj pozivnice: ${brojPozivnice}`
                                  : ''}
                              </div>
                            </>
                          )}
                        </>
                      )}
                      <div className='cardBtns'>
                        <a
                          href={salon.WebPage}
                          target='_blank'
                          className='btn moreInfoWeddingSalon'
                          rel='noreferrer'
                        >
                          Više informacija
                        </a>
                        {selectedDates[salon.IDSalona] && (
                          <>
                            <div className='space'></div>
                            <button
                              className='btn moreInfoWeddingSalon'
                              onClick={() => handleReservation(salon.IDSalona)}
                            >
                              Rezerviraj
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))) || (
              <div className='col-lg-12 col-md-12 col-sm-12 mb-12'>
                <div className='card justify-content-center align-items-center'>
                  <img src={guestSalon?.ImageUrl} alt='Salon' />
                  <div className='card-body cardBodyWeddingSalon'>
                    <h5 className='card-title'>{guestSalon?.NazivSalona}</h5>
                    <p className='card-text'>{guestSalon?.Opis}</p>
                    <p className='card-text'>
                      Broj sjedecih mjesta: {guestSalon?.Kapacitet}
                    </p>
                    <div className='card-text mladenci'>
                      <div className='textMladenci'>{`${mladenci?.imePrezime}`}</div>
                      <div className='spaceMladenci'> & </div>
                      <div className='textMladenci'>
                         {mladenci?.imePrezimePartnera}
                      </div>
                    </div>
                    <p className='card-text rezervationDate'>
                      Datum svadbe: {gostDatum}
                    </p>
                    <div className='rezervationDate'>
                      {gostDatum ? `Broj pozivnice: ${brojPozivnice}` : ''}
                    </div>

                    <a href='#' className='btn moreInfoWeddingSalon'>
                      Više informacija
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className='container mt-4'style={{paddingBottom: '100px'}}>
          <h2>Dodaj Salon</h2>
          <form>
            <div className='mb-3'>
              <label htmlFor='nazivSalona' className='form-label'>
                Naziv Salona:
              </label>
              <input
                type='text'
                className='form-control'
                id='nazivSalona'
                name='nazivSalona'
                value={salon.nazivSalona}
                onChange={handleChange}
                required
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='opis' className='form-label'>
                Opis:
              </label>
              <textarea
                className='form-control'
                id='opis'
                name='opis'
                value={salon.opis}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className='mb-3'>
              <label htmlFor='adresa' className='form-label'>
                Adresa:
              </label>
              <input
                type='text'
                className='form-control'
                id='adresa'
                name='adresa'
                value={salon.adresa}
                onChange={handleChange}
                required
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='kontakt' className='form-label'>
                Kontakt broj:
              </label>
              <input
                type='number'
                className='form-control'
                id='kontakt'
                name='kontakt'
                value={salon.kontakt}
                onChange={handleChange}
                required
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='kapacitet' className='form-label'>
                Broj sjedećih mjesta:
              </label>
              <input
                type='number'
                className='form-control'
                id='kapacitet'
                name='kapacitet'
                value={salon.kapacitet}
                onChange={handleChange}
                required
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='imageUrl' className='form-label'>
                URL Slike:
              </label>
              <input
                type='text'
                className='form-control'
                id='imageUrl'
                name='imageUrl'
                value={salon.imageUrl}
                onChange={handleChange}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='imageUrl' className='form-label'>
                Službena web stranica objekta:
              </label>
              <input
                type='text'
                className='form-control'
                id='webPage'
                name='webPage'
                value={salon.webPage}
                onChange={handleChange}
              />
            </div>
          </form>
        </div>
      )}

      {props.autentification.isAdmin && (
        <div className='addSalonBtn'>
          {!addSalon ? (
            <button
              onClick={() => setAddSalon(!addSalon)}
              className='addSalonButtonBig btn'
            >
              Dodaj salon
            </button>
          ) : (
            <>
              <button
                onClick={() => setAddSalon(!addSalon)}
                className='addSalonButton btn'
              >
                Nazad
              </button>
              <div className='space'></div>
              <button
                type='submit'
                onClick={handleSubmit}
                className='btn addSalonButton'
              >
                Dodaj Salon
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
