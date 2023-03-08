// const express = require('express');
// const mongoose = require('mongoose');

// const app = express();
// const port = 3000;

// mongoose
//   .connect(
//     'mongodb+srv://dat05102003:ICc5dfkRhQc8fP9r@cluster0.ua7rf6q.mongodb.net/?retryWrites=true&w=majority',
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
//   )
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((err) => {
//     console.error('Failed to connect to MongoDB', err);
//   });

// app.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// });

const express = require('express');
const mysql = require('mysql2');

const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'tai54852_admin',
  password: '0C8tVI#)MGFR',
  database: 'tai54852_db',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
  } else {
    console.log('Connected to MySQL database!');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
