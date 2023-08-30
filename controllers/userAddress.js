const express = require('express');
const Address = require('../Model/userAddressModel');


exports.createNewAddress=async (req, res) => {
    try {
      const {name, email,phone,city,state,postalCode,fullAddress,landMark } = req.body;

      const newUserAddress = new Address({ name, email,phone,city,state,postalCode,fullAddress,landMark });
  
      await newUserAddress.save();
      res.status(201).json({ message: 'newUserAddress added successfully' });
    } catch (error) {
      console.error('Error adding user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  exports.getAlladdress=async(req, res)=>{
    try{

        const userAddress=await Address.find();
        res.json(userAddress);
    }
    catch(error){
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  }