const { Router } = require('express');
const { artist_protect } = require('../middlewares/auth.middleware');
const { uploadArt, updateArt } = require('../controllers/product.controller');
const {
  artistSignUp,
  artistLogin,
  getMyArts,
} = require('../controllers/artist.controller');

const router = Router();

router.post('/signup', artistSignUp);
router.post('/login', artistLogin);

router.use(artist_protect);

router.post('/upload-art', uploadArt);
router.patch('/update-art/:artId', updateArt);
router.get('/my-arts', getMyArts);

router.route('/').get((req, res) => {
  res.status(200).json({
    ststus: true,
    message: 'ok',
  });
});

module.exports = router;
