const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = 3000;

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/images', express.static(__dirname + 'public/images'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.render('contact');
});

app.post('/contact', async (req, res) => {
  const { hoten, incomeType, kv, sdt, sotienvay } = req.body;

  try {
    const connection = await pool.getConnection();
    await connection.execute(
      'INSERT INTO contacts (hoten, incomeType, kv, sdt, sotienvay) VALUES (?, ?, ?, ?, ?)',
      [
        hoten ? hoten : null,
        incomeType ? incomeType : null,
        kv ? kv : null,
        sdt ? sdt : null,
        sotienvay ? sotienvay : null,
      ]
    );
    console.log('Inserted contact successfully');
    connection.release();

    const htmlContent = `
    <p>Thông tin khách hàng TPBank</p>
    <ul>
      <li>Họ tên: ${hoten}</li>
      <li>Số điện thoại: ${sdt}</li>
      <li>Khu vực: ${kv}</li>
      <li>Số tiền vay: ${sotienvay} VND</li>
      <li>Điều kiện vay vốn: ${incomeType}</li>
    </ul>
  `;

    const mailConfig = {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    };

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: 'Thông tin khách hàng TPBank',
      html: htmlContent,
    };

    let transporter = nodemailer.createTransport(mailConfig);
    let info = await transporter.sendMail(mailOptions);

    console.log('Message sent: %s', info);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
