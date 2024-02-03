const express = require('express');
const app = express();
const port = 3000;
const users = require('./routes/users');
const weddingSalons = require('./routes/weddingSalons');
const reservationRoutes = require('./routes/reservation');
const tables = require('./routes/tables');
const seats = require('./routes/seats');

const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get('/', (req, res) => {
  res.json({ message: 'ok' });
});


app.use('/users', users);
app.use('/svadbeniSaloni', weddingSalons);
app.use('/rezervacije', reservationRoutes);
app.use('/stolovi', tables);
app.use('/stolice', seats);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
