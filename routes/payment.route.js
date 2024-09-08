const { Router } = require('express');
const {
  createOrder,
  verifyOrder,
} = require('../controllers/payment.controller');

const router = Router();

router.post('/create-order', createOrder);
router.post('/verify-order', verifyOrder);

module.exports = router;
