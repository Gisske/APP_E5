const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail', // ใช้บริการอีเมลที่คุณต้องการ
  auth: {
    user: 'your-email@gmail.com', // เปลี่ยนเป็นอีเมลของคุณ
    pass: 'your-email-password', // เปลี่ยนเป็นรหัสผ่านอีเมลของคุณ
  },
});

app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: 'your-email@gmail.com', // เปลี่ยนเป็นอีเมลของคุณ
    to: '66309010026@ccollege.ac.th', // อีเมลที่คุณต้องการส่งถึง
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Error sending email.');
    }
    res.status(200).send('Email sent successfully.');
  });
});

const PORT = 7000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
