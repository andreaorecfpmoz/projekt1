const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const config = require('../config');

const pool = mysql.createPool(config.db);

function formatDateToDDMMYYYY(inputDate) {
  const date = new Date(inputDate);
  const day = ('0' + date.getDate()).slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

router.post('/add', async (req, res, next) => {
  try {
    const { idSvadbenogSalona, idKorisnika, datum } = req.body;
    const formattedDate = datum;

    const [existingReservation] = await pool.query(
      `
        SELECT * FROM Rezervacije 
        WHERE IDSvadbenogSalona = ? AND DatumRezervacije = ?
      `,
      [idSvadbenogSalona, formattedDate]
    );

    if (existingReservation.length > 0) {
      return res
        .status(400)
        .json({ message: 'Rezervacija za odabrani datum već postoji.' });
    }

    const [reservationResult] = await pool.query(
      `
        INSERT INTO Rezervacije (IDSvadbenogSalona, DatumRezervacije, IDKorisnika)
        VALUES (?, ?, ?)
      `,
      [idSvadbenogSalona, formattedDate, idKorisnika]
    );
    const IDSvadbe = reservationResult.insertId;

    const [tables] = await pool.query(
      'SELECT * FROM Stolovi WHERE IDSalona = ?',
      [idSvadbenogSalona]
    );

    for (const table of tables) {
      await pool.query(
        `
          INSERT INTO SvadbaStolovi (IDSvadbe, IDStola, IDSalona)
          VALUES (?, ?, ?)
        `,
        [IDSvadbe, table.IDStola, idSvadbenogSalona]
      );
    }

    res
      .status(201)
      .json({ message: 'Rezervacija uspješno dodana.', id: IDSvadbe });
  } catch (error) {
    console.error('Error during reservation', error);
    res
      .status(500)
      .json({ message: 'Došlo je do greške pri dodavanju rezervacije.' });
  }
});

router.get('/get/:idSalona', async (req, res, next) => {
  try {
    const { idSalona } = req.params;
    const query = 'SELECT * FROM Rezervacije WHERE IDSvadbenogSalona = ?';
    const [reservedDates] = await pool.query(query, [idSalona]);
    const formattedReservations = reservedDates.map((reservation) => {
      return {
        ...reservation,
        DatumRezervacije: formatDateToDDMMYYYY(reservation.DatumRezervacije),
      };
    });
    res.json(formattedReservations);
  } catch (error) {
    console.error('Error fetching reservations', error);
    res.status(500).json({
      message: 'Došlo je do greške pri dohvaćanju rezervacija.',
    });
  }
});

router.get('/get/korisnik/:idKorisnika', async (req, res, next) => {
  try {
    const { idKorisnika } = req.params;

    const query = 'SELECT * FROM Rezervacije WHERE IDKorisnika = ?';
    const [userReservations] = await pool.query(query, [idKorisnika]);

    const formattedReservations = userReservations.map((reservation) => ({
      ...reservation,
      DatumRezervacije: formatDateToDDMMYYYY(reservation.DatumRezervacije),
    }));

    res.json(formattedReservations);
  } catch (error) {
    console.error('Error fetching reservations for user', error);
    res.status(500).json({
      message: 'Došlo je do greške pri dohvaćanju rezervacija za korisnika.',
    });
  }
});

module.exports = router;
