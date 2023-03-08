const express = require('express');
// const mongoose = require('mongoose');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// const uri =
//   'mongodb+srv://dat05102003:ICc5dfkRhQc8fP9r@cluster0.ua7rf6q.mongodb.net/contact';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'tai54852_admin',
  password: '0C8tVI#)MGFR',
  database: 'tai54852_db',
});

app.set('view engine', 'ejs');

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static(__dirname + '/public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/images', express.static(__dirname + 'public/images'));

app.get('/', function (req, res) {
  res.render('contact');
});

// app.post('/contact', async function (req, res) {
//   const { hoten, sdt, kv, sotienvay, incomeType } = req.body;
//   try {
//     await mongoose.connect(uri, { useNewUrlParser: true });
//     console.log('MongoDB connected');
//     const Contact = mongoose.model('Contact', {
//       hoten: String,
//       sdt: String,
//       kv: String,
//       sotienvay: String,
//       incomeType: String,
//     });
//     try {
//       const contact = new Contact({ hoten, sdt, kv, sotienvay, incomeType });
//       await contact.save();
//       res.send(contact);
//     } catch (err) {
//       res.status(500).send('Save fail!');
//     }
//   } catch (err) {
//     console.log(err);
//     res.send('Connection fail!');
//   }
// });

app.post('/contact', async (req, res) => {
  const { hoten, incomeType, kv, sdt, sotienvay } = req.body;

  try {
    const connection = await pool.getConnection();
    const result = await connection.execute(
      'INSERT INTO contacts (hoten, incomeType, kv, sdt, sotienvay) VALUES (?, ?, ?, ?, ?)',
      [hoten, incomeType, kv, sdt, sotienvay]
    );
    connection.release();
    console.log('Inserted contact successfully');
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
