const { Router } = require('express');
const { artist_protect } = require('../middlewares/auth.middleware');
const {
  uploadArt,
  updateArt,
  deleteArt,
} = require('../controllers/product.controller');
const {
  artistSignUp,
  artistLogin,
  getMyArts,
  editArtistDetails,
  isArtistLoggedIn,
  artistSignInWithGoogle,
} = require('../controllers/artist.controller');

const router = Router();

router.post('/signup', artistSignUp);
router.post('/login', artistLogin);
router.post('/google', artistSignInWithGoogle);
router.get('/is-artist-loggedin', isArtistLoggedIn);

router.use(artist_protect);

router.post('/upload-art', uploadArt);
router.patch('/update-art/:artId', updateArt);
router.patch('/delete-art/:artId', deleteArt);
router.patch('/edit-details', editArtistDetails);
router.get('/my-arts', getMyArts);

router.route('/').get((req, res) => {
  res.status(200).json({
    ststus: true,
    message: 'ok',
  });
});

module.exports = router;
