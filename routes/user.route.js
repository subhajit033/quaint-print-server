const { Router } = require('express');
const {
  userLogin,
  userSignup,
  isUserLoggedin,
  userSignInWithGoogle,
} = require('../controllers/auth.controller');
const { user_protect } = require('../middlewares/auth.middleware');
const {
  getBanner,
  getBestDeal,
  getBestSeller,
} = require('../controllers/content.controller');
const { editUserDetails } = require('../controllers/user.controller');
const {
  addTocart,
  deleteFromCart,
  getCartItem,
  updateCart,
} = require('../controllers/cart.controller');
const { getAllProduct } = require('../controllers/product.controller');

const router = Router();

router.post('/signup', userSignup);
router.post('/login', userLogin);
router.post('/google', userSignInWithGoogle);
router.get('/is-user-loggedin', isUserLoggedin);

//produvts
router.get('/get-all-products', getAllProduct);

//content public routes
router.get('/banner', getBanner);
router.get('/best-deal', getBestDeal);
router.get('/best-seller', getBestSeller);

router.use(user_protect);

router.patch('/edit-details', editUserDetails);

//cart related
router.post('/add-to-cart/:productId', addTocart);
router.patch('/cart/:cartId', updateCart);
router.delete('/delete-from-cart/:productId', deleteFromCart);
router.get('/get-cart-item', getCartItem);

module.exports = router;
