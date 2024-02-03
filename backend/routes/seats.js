const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const config = require('../config');
const pool = mysql.createPool(config.db);

router.post('/add', async (req, res) => {
  try {
    const reservations = req.body;
    const insertQuery = `
          INSERT INTO Stolice (IDStola, IDSvadbe, ImeKorisnika, BrojStolice)
          VALUES (?, ?, ?, ?)
      `;
    const checkDuplicateQuery = `
          SELECT * FROM Stolice
          WHERE IDStola = ? AND IDSvadbe = ? AND ImeKorisnika = ? AND BrojStolice = ?
      `;

    for (const reservation of reservations) {
      const { IDStola, IDSvadbe, ImeKorisnika, BrojStolice } = reservation;
      if (!IDStola || !IDSvadbe || !ImeKorisnika || !BrojStolice) {
        return res
          .status(400)
          .json({ message: 'Svi podaci su potrebni za svaku rezervaciju.' });
      }

      const [existingReservations] = await pool.query(checkDuplicateQuery, [
        IDStola,
        IDSvadbe,
        ImeKorisnika,
        BrojStolice,
      ]);

      if (existingReservations.length === 0) {
        await pool.query(insertQuery, [
          IDStola,
          IDSvadbe,
          ImeKorisnika,
          BrojStolice,
        ]);
      }
    }

    res.status(201).json({ message: 'Rezervacije su uspješno spremljene.' });
  } catch (error) {
    console.error('Error saving reservations:', error);
    res
      .status(500)
      .json({ message: 'Došlo je do greške pri spremanju rezervacija.' });
  }
});

router.get('/get/:IDSvadbe', async (req, res) => {
  try {
    const { IDSvadbe } = req.params;

    if (!IDSvadbe) {
      return res
        .status(400)
        .json({ message: 'ID svadbe je potreban za pretragu.' });
    }

    const selectQuery = `
        SELECT * FROM Stolice WHERE IDSvadbe = ?
      `;

    const [stolice] = await pool.query(selectQuery, [IDSvadbe]);

    const [stolice1] = await pool.query(`SELECT * FROM Stolice`);

    console.log(stolice);
    console.log(stolice1);

    if (stolice.length === 0) {
      return res
        .status(404)
        .json({ message: 'Nema pronađenih stolica za navedeni ID svadbe.' });
    }

    res.json(stolice);
  } catch (error) {
    console.error('Error fetching chairs:', error);
    res
      .status(500)
      .json({ message: 'Došlo je do greške pri dohvaćanju stolica.' });
  }
});

module.exports = router;
