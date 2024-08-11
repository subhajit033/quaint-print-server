const { Router } = require('express');
const {
  artistSignUp,
  artistLogin,
} = require('../controllers/artist.controller');

const router = Router();

router.post('/signup', artistSignUp);
router.post('/login', artistLogin);

router.route('/').get((req, res) => {
  res.status(200).json({
    ststus: true,
    message: 'ok',
  });
});

module.exports = router;
