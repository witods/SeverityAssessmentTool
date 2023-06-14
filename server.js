const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 5500;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files (CSS, JS, etc.) from a public directory
app.use(express.static('dist'));

// Configure storage for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'dist', 'uploads')); // Upload files to the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original filename
  },
});

// Create a multer instance with the configured storage
const upload = multer({ storage });

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist/index.html'));
});

// Handle the form submission
app.post('/post', upload.array('upload'), (req, res) => {
  const { fName, lName, email, company, message } = req.body;

  // Get the filenames of the uploaded files
  const filenames = req.files ? req.files.map((file) => file.filename) : [];
    console.log(filenames)
  // Create a transporter for sending emails (configure it with your SMTP settings)
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // e.g., 'Gmail'
    auth: {
      user: 'wito.ds@gmail.com',
      pass: 'sgwxfngajsubmfev',
    },
  });

  // Define the email options
  const mailOptions = {
    from: 'wito.ds@gmail.com',
    to: 'wito.ds@gmail.com',
    subject: 'SAT - New Contact Form Submission',
    text: `
      First Name: ${fName}
      Last Name: ${lName}
      Email: ${email}
      Company: ${company}
      Message: ${message}
    `,
    attachments: filenames.map((filename) => ({
        filename: filename,
        path: path.join(__dirname, '..', 'dist', 'uploads', filename),
      })),
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Email sent successfully');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
