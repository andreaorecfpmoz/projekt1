import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navigation/navbar';
import './seatingArrangementPage.css';
import TableComponent from '../../components/tableComponent/tableComponent';
import AddTable from './addTable';
import ChooseSalon from '../../components/chooseSalon/chooseSalon';

export default function SeatingArrangementPage(props) {
  const [editTable, setEditTable] = useState();
  const [addTable, setAddTable] = useState(false);
  const [svadbeniSalon, setSvadbeniSalon] = useState(false);
  const [tables, setTables] = useState([]);
  const [rezervation, setReservation] = useState();


  useEffect(() => {
    if (!props.autentification.isAdmin) {
      const userLocalStorage = localStorage.getItem('user');

      const user = JSON.parse(userLocalStorage);
      const userId = props.autentification.isNewlyweds ? user?.user?.id : props.autentification.isGuest && user.user.brojPozivnice;


      const fetchReservations = async () => {
        try {
          const response = await fetch(
            `http://wedease.studenti.sum.ba/rezervacije/get/korisnik/${userId}`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const reservations = await response.json();
          console.log(reservations)
          setReservation(reservations);
        } catch (error) {
          console.error('Error fetching reservations for user', error);
        }
      };

      fetchReservations();
    }
  }, [props.autentification.isNewlyweds]);

  const editBtnHandler = (table) => {
    setEditTable(table);
    setAddTable(false);
  };

  const onAddTableHandler = () => {
    setAddTable(!addTable);
    setEditTable(null);
  };

  const backFromTableMenagment = async (table) => {
    const oldTable = tables.find((t) => t.IDStola === table[0]?.IDStola);

    if (table && !oldTable) {
      try {
        const response = await fetch('http://wedease.studenti.sum.ba/stolovi/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: table[0].ImeStola,
            seats: table[0].BrojStolica,
            idSalona: svadbeniSalon.IDSalona,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const tableData = data.table;

        if (tableData) {
          setTables((prevTables) => [...prevTables, tableData]);
        }
      } catch (error) {
        console.error('There was an error!', error);
      }
    }

    if (oldTable) {
      try {
        const response = await fetch(
          `http://wedease.studenti.sum.ba/stolovi/edit/${oldTable.IDStola}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: table[0].ImeStola,
              seats: table[0].BrojStolica,
              idSalona: svadbeniSalon.IDSalona,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const tableData = data.table;

        if (tableData) {
          setTables((prevTables) =>
            prevTables.map((table) => {
              if (table.IDStola === oldTable.IDStola) {
                return tableData;
              }

              return table;
            })
          );
        }
      } catch (error) {
        console.error('Error during update:', error);
      }
    }

    setAddTable(false);
    setEditTable(null);
  };

  const onReserveSeats = async (tableId, reservedSeats) => {
    const updatedTables = tables.map((table) => {
      if (table.IDStola === tableId) {
        const updatedGuests = table.guests ? [...table.guests] : [];

        Object.entries(reservedSeats).forEach(([key, name]) => {
          const seat = parseInt(key.split('-')[1], 10);
          const guestIndex = updatedGuests.findIndex(
            (guest) => guest.seat === seat
          );

          if (guestIndex !== -1) {
            updatedGuests[guestIndex].name = name;
          } else {
            updatedGuests.push({ name, seat });
          }
        });

        return { ...table, guests: updatedGuests };
      }
      return table;
    });

    setTables(updatedTables);

    const res = [];

    

    updatedTables.forEach((table) => {
      if (table.IDStola === tableId) {
        table.guests.forEach((guest) => {
          res.push({
            IDStola: tableId,
            IDSvadbe: rezervation[0].IDRezervacije,
            ImeKorisnika: guest.name,
            BrojStolice: guest.seat,
          });
        });
      }
    });

    try {
      const response = await fetch('http://wedease.studenti.sum.ba//stolice/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(res),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const data = await response.json();

    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  async function getSalon(salonID) {
    setSvadbeniSalon(salonID);

    try {
      const response = await fetch(
        `http://wedease.studenti.sum.ba/stolovi/get/${salonID.IDSalona}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTables(data);
    } catch (error) {
      console.error('Could not fetch the data', error);
    }
  }

  useEffect(() => {
    const fetchTablesData = async () => {
      if (rezervation && rezervation.length > 0) {
        try {
  
          const tablesResponse = await fetch(
            `http://wedease.studenti.sum.ba/get/rezervedTables/${rezervation[0].IDRezervacije}`
          );
          if (!tablesResponse.ok) {
            throw new Error(`HTTP error! status: ${tablesResponse.status}`);
          }
          const tables = await tablesResponse.json();
          
          const tablesDetailsPromises = tables.map(table =>
            fetch(`http://wedease.studenti.sum.ba/stolovi/getTablesById/${table.IDStola}`).then(res => res.json())
          );
          const detailedTables = await Promise.all(tablesDetailsPromises);
  

          const guestsResponse = await fetch(`http://wedease.studenti.sum.ba/stolice/get/${rezervation[0].IDRezervacije}`);
          if (guestsResponse.ok) {
            const tablesData = await guestsResponse.json();
          
            const tablesGuestsMap = {};
            tablesData.forEach((reservation) => {
              if (!tablesGuestsMap[reservation.IDStola]) {
                tablesGuestsMap[reservation.IDStola] = [];
              }
              tablesGuestsMap[reservation.IDStola].push({
                name: reservation.ImeKorisnika,
                seat: reservation.BrojStolice,
              });
            });
  
            const updatedTables = detailedTables.map((table) => {
              return {
                ...table[0],
                guests: tablesGuestsMap[table[0].IDStola] || [],
              };
            });

  
            setTables(updatedTables);
          } else {
            console.log(detailedTables)
            setTables(...detailedTables);
          }
        } catch (error) {
          console.error('Error fetching tables data', error);
        }
      }
    };
  
    if (rezervation) {
      fetchTablesData();
    }
  }, [rezervation]);



  return (
    <>
      <Navbar
        autentification={props.autentification}
        logoutUser={props.logoutUser}
      />
      <div className='containerSeatingArragment'>
        {props.autentification.isAdmin && (
          <>
            <div className='chooseSalonFlex'>
              <ChooseSalon getSalon={getSalon} />
            </div>
            {svadbeniSalon && (
              <>
                <button
                  type='submit'
                  className=' addTableButton'
                  onClick={onAddTableHandler}
                  disabled={editTable}
                >
                  Dodaj stol
                </button>
                {(editTable || addTable) && (
                  <AddTable
                    table={editTable}
                    backFromTableMenagment={backFromTableMenagment}
                  />
                )}
              </>
            )}
          </>
        )}
        <div className='row'>
          {tables?.map((table) => {
            return (
              <div className='col-lg-4 col-md-6 col-sm-12 mb-10 arragmentSeat'>
                <div className='card justify-content-center align-items-center'>
                  <div className='card-body'>
                    <div className='seatingArragmentCardHeader'>
                      <h5 className='card-title tableTitle'>
                        {table.ImeStola}
                      </h5>
                      {props.autentification.isAdmin && (
                        <button
                          className='seatingArragmentEditBtn'
                          onClick={() => editBtnHandler(table)}
                          disabled={addTable}
                        >
                          Uredi
                        </button>
                      )}
                    </div>
                    <TableComponent
                      table={table}
                      onReserveSeats={onReserveSeats}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
