const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/momo', paymentController.MoMoPayment);

router.post('/momo/callback', paymentController.MoMoCallBack);
module.exports = router