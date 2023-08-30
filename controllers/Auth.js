

const express=require('express')
const app=express()
const bcrypt=require('bcrypt')
const User=require('../Model/user')
const randomstring = require('randomstring');
const nodemailer = require('nodemailer');





exports.createUser=async (req, res) => {

  try {
    const { Name,Email,Phone,Password} = req.body;

    const existingUser=await User.findOne({$or:[
      { Email: Email },  // Assuming 'email' is the variable containing the email to check
      { Phone: Phone }   // Assuming 'phone' is the variable containing the phone number to check
    ]})
    if (existingUser){
      return res.json({ error: 'Username already taken.' })

    }
const hashedPassowrd=await bcrypt.hash(Password,10)
    const newUser = new User({  Name,Email,Phone,Password: hashedPassowrd});

    await newUser.save();
    res.status(201).json({ message: 'User added successfully' });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


app.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });




  //OTP Verifications starts here

  // Create a nodemailer transporter
// const transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: 'samsuddin.ansari@thirdeyeautomation.com', // Your email
//     pass: 'Samsu@ajuk17' // Your email password
//   }
// });

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'buster.blanda48@ethereal.email',
      pass: 'jQGa8VtmWCfyTNWvPy'
  }
});

// // Create a nodemailer transporter
// const transporter = nodemailer.createTransport({
//   service: 'Gmail', // Update to the email service you are using
//   auth: {
//     user: 'biosamsuddin@gmail.com', // Your email
//     pass: 'Samsu@ajuk17', // Your email password
//   },
// });

exports.generateOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = randomstring.generate({ length: 6, charset: 'numeric' });

    // Save the OTP in the database (you need a user schema)

    // Send the OTP to the user's email using nodemailer
    const mailOptions = {
      from: 'biosamsuddin@gmail.com', // Your email
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Error sending OTP email' });
      } else {
        console.log('OTP email sent:', info.response);
        res.json({ message: 'OTP email sent successfully' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error generating OTP' });
  }
};
