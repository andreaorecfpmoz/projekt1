const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const config = require('../config'); // Pretpostavljamo da je config u istom direktoriju
const bcrypt = require('bcrypt');
const saltRounds = 10;

const pool = mysql.createPool(config.db);

router.post('/register', async (req, res, next) => {
  try {
    const { imePrezime, imePrezimePartnera, email, lozinka, grad, uloga } =
      req.body;
    // Ovdje biste dodali validaciju podataka
    const aktivan = 1; // Ako želite da novi korisnici budu automatski aktivni

    const hashedPassword = await bcrypt.hash(lozinka, saltRounds);

    const query = `
      INSERT INTO Korisnici (ImePrezime, ImePrezimePartnera, Email, Lozinka, Uloga, Grad, Aktivan)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.execute(query, [
      imePrezime,
      imePrezimePartnera,
      email,
      hashedPassword,
      uloga,
      grad,
      aktivan,
    ]);

    const newUserQuery = 'SELECT * FROM Korisnici WHERE IDKorisnika = ?';
    const [newUserResult] = await pool.execute(newUserQuery, [result.insertId]);

    if (newUserResult.length === 0) {
      return res
        .status(400)
        .json({ message: 'Greška pri registraciji korisnika.' });
    }

    const newUser = newUserResult[0];

    res.status(201).json({
      user: {
        id: newUser.IDKorisnika,
        imePrezime: newUser.ImePrezime,
        email: newUser.Email,
        uloga: newUser.Uloga,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, lozinka } = req.body;
    const query = 'SELECT * FROM Korisnici WHERE Email = ?';
    const [users] = await pool.execute(query, [email]);

    if (users.length === 0) {
      return res.status(401).json({ message: 'Korisnik nije pronađen.' });
    }

    const user = users[0];

    const match = await bcrypt.compare(lozinka, user.Lozinka);
    if (!match) {
      return res.status(401).json({ message: 'Neispravna lozinka.' });
    }

    res.json({
      user: {
        id: user.IDKorisnika,
        imePrezime: user.ImePrezime,
        email: user.Email,
        uloga: user.Uloga,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post('/loginGost', async (req, res, next) => {
  try {
    const { imePrezime, email, brojPozivnice } = req.body;
    const uloga = 'Gost';

    let queryParams = [imePrezime, email, uloga, brojPozivnice];
    let query = `
      INSERT INTO Korisnici (ImePrezime, Email, Uloga, BrojPozivnice)
      VALUES (?, ?, ?, ?)
    `;

    const [result] = await pool.execute(query, queryParams);

    res.json({
      user: {
        id: result.insertId,
        imePrezime: imePrezime,
        email: email,
        uloga: uloga,
        brojPozivnice: brojPozivnice || null,
      },
    });
  } catch (error) {
    console.error('Error during guest login:', error);
    res.status(500).json({ message: 'Došlo je do greške pri prijavi gosta.' });
  }
});

router.get('/get/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const query = 'SELECT * FROM Korisnici WHERE IDKorisnika = ?';
    const [users] = await pool.execute(query, [id]);

    if (users.length === 0) {
      return res.status(404).json({ message: 'Korisnik nije pronađen.' });
    }

    const user = users[0];

    res.json({
      id: user.IDKorisnika,
      imePrezime: user.ImePrezime,
      imePrezimePartnera: user.ImePrezimePartnera,
      email: user.Email,
      uloga: user.Uloga,
    });
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res
      .status(500)
      .json({ message: 'Došlo je do greške pri dohvatu korisnika.' });
  }
});

module.exports = router;
