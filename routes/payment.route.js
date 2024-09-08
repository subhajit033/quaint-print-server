const { Router } = require('express');
const {
  createOrder,
  verifyOrder,
} = require('../controllers/payment.controller');

const router = Router();

router.post('/create-order', createOrder);
router.post('/verify-payment', verifyOrder);

module.exports = router;
