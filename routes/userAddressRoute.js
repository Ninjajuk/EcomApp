const express = require('express');
const router = express.Router();
const { createNewAddress,getAlladdress } = require('../controllers/userAddress');

router.post('/addAddress', createNewAddress)
.get('/address',getAlladdress)

module.exports = router;
