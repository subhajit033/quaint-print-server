const { Router } = require('express');
const {
  userLogin,
  userSignup,
  isUserLoggedin,
  userSignInWithGoogle,
  logoutUser,
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
const { getMyOrders } = require('../controllers/order.controller');

const router = Router();

router.post('/signup', userSignup);
router.post('/login', userLogin);
router.post('/google', userSignInWithGoogle);
router.get('/is-user-loggedin', isUserLoggedin);
router.get('/logout', logoutUser);

//produvts
router.get('/get-all-products', getAllProduct);

//content public routes
router.get('/banner', getBanner);
router.get('/best-deal', getBestDeal);
router.get('/best-seller', getBestSeller);

router.use(user_protect);

router.patch('/edit-details', editUserDetails);

//cart related
router.post('/add-to-cart', addTocart);
router.route('/cart/:cartId').patch(updateCart).delete(deleteFromCart);
// router.delete('/delete-from-cart/:productId', deleteFromCart);
router.get('/get-cart-item', getCartItem);

//order related
router.get('/get-my-orders', getMyOrders);

module.exports = router;
