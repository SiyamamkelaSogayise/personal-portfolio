const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();

// Middleware to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: false }));
// Middleware to parse JSON data
app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
    const { name, email, phone, message } = req.body; // Extract fields from request body

    // Set up the transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: 'siyamamkela.sogayise@gmail.com',
            pass: 'nbaq dlnc zdyx labq  ' // Use your actual password or app-specific password
        }
    });

    // Email options
    const mailOptions = {
        from: email,
        to: 'siyamamkela.sogayise@gmail.com',
        subject: `Contact Form Submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send('Damn Error');
        }
        res.status(200).send('Email sent successfully');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
