const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/momo', authenticateToken, paymentController.MoMoPayment);

router.post('/momo/callback', paymentController.MoMoCallBack);

router.post('/zalopay', authenticateToken, paymentController.ZaloPayment);

router.post('/zalopay/callback', paymentController.ZaloPaymentCallback);

module.exports = router