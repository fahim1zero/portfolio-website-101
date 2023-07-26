const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000; // Change this to the desired port number

// Parse incoming form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS headers (if needed)
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

// POST route to handle form submission
app.post('/sendEmail', (req, res) => {
    const { name, email, message } = req.body;

    // Create a nodemailer transporter with your email provider's SMTP settings
    const transporter = nodemailer.createTransport({
        service: 'your-email-provider', // E.g., 'gmail', 'hotmail', 'yahoo'
        auth: {
            user: 'your-email@example.com',
            pass: 'your-email-password'
        }
    });

    // Email options
    const mailOptions = {
        from: 'your-email@example.com', // Sender's email address
        to: 'fahimbinkamal2210@gmail.com', // Recipient's email address (where the form data will be sent)
        subject: 'New Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});