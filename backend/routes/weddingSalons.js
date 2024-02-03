const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const config = require('../config');
const pool = mysql.createPool(config.db);

router.get('/get', async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM SvadbeniSaloni');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/get/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const query = 'SELECT * FROM SvadbeniSaloni WHERE IDSalona = ?';
    const [salon] = await pool.query(query, [id]);

    if (salon.length === 0) {
      return res.status(404).json({ message: 'Salon nije pronađen.' });
    }

    res.json(salon[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/add', async (req, res, next) => {
  try {
    const { nazivSalona, opis, adresa, kontakt, kapacitet, imageUrl, webPage } =
      req.body;

    const query = `
      INSERT INTO SvadbeniSaloni (NazivSalona, Opis, Adresa, Kontakt, Kapacitet, ImageUrl, WebPage)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.execute(query, [
      nazivSalona,
      opis,
      adresa,
      kontakt,
      kapacitet,
      imageUrl,
      webPage,
    ]);

    res.status(201).json({ id: result.insertId });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
