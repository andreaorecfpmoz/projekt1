const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const config = require('../config');
const pool = mysql.createPool(config.db);

router.get('/get', async (req, res) => {
  try {
    const allTables = await pool.query('SELECT * FROM Stolovi');
    res.json(allTables.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/get/:idSalona', async (req, res) => {
  try {
    const { idSalona } = req.params;

    const query = 'SELECT * FROM Stolovi WHERE IDSalona = ?';
    const [tables] = await pool.query(query, [idSalona]);

    res.json(tables);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/add', async (req, res) => {
  try {
    const { name, seats, idSalona } = req.body;

    if (!name || !seats || !idSalona) {
      return res.status(400).json({ message: 'Svi podaci su potrebni.' });
    }

    const query = `
        INSERT INTO Stolovi (ImeStola, BrojStolica, IDSalona)
        VALUES (?, ?, ?)
      `;

    const [result] = await pool.execute(query, [name, seats, idSalona]);

    res.status(201).json({
      message: 'Stol uspješno dodan.',
      table: {
        IDStola: result.insertId,
        ImeStola: name,
        BrojStolica: seats,
        IDSalona: idSalona,
      },
    });
  } catch (error) {
    console.error('Error adding new table:', error);
    res
      .status(500)
      .json({ message: 'Došlo je do greške pri dodavanju stola.' });
  }
});

router.put('/edit/:id', async (req, res) => {
  try {
    const { id } = req.params; // ID of the table to update
    const { name, seats, idSalona } = req.body; // New data for the table

    // UPDATE statement to change the table data in the database
    const [result] = await pool.query(
      `
        UPDATE Stolovi SET ImeStola = ?, BrojStolica = ?, IDSalona = ?
        WHERE IDStola = ?
      `,
      [name, seats, idSalona, id]
    );

    if (result.affectedRows === 0) {
      // If no rows are affected, it means the table with the given ID was not found
      return res.status(404).json({ message: 'Stol nije pronađen.' });
    }

    res.status(201).json({
      message: 'Stol uspješno dodan.',
      table: {
        IDStola: result.insertId,
        ImeStola: name,
        BrojStolica: seats,
        IDSalona: idSalona,
      },
    });
  } catch (error) {
    console.error('Error updating table:', error);
    res
      .status(500)
      .json({ message: 'Došlo je do greške pri ažuriranju stola.' });
  }
});

router.get('/get/rezervedTables/:idSvadbe', async (req, res) => {
  try {
    const { idSvadbe } = req.params;

    const query = `
          SELECT IDStola FROM SvadbaStolovi
          WHERE IDSvadbe = ?
        `;

    const [stolovi] = await pool.query(query, [idSvadbe]);

    res.json(stolovi);
  } catch (error) {
    console.error('Error fetching tables for wedding:', error);
    res.status(500).json({
      message: 'Došlo je do greške pri dohvaćanju stolova za svadbu.',
    });
  }
});

router.get('/getTablesById/:idStola', async (req, res) => {
  try {
    const { idStola } = req.params;

    const query = 'SELECT * FROM Stolovi WHERE IDStola = ?';
    const [tables] = await pool.query(query, [idStola]);

    if (tables.length === 0) {
      return res
        .status(404)
        .json({ message: 'Stol s navedenim ID-om nije pronađen.' });
    }

    res.json(tables);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
