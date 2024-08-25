const { Router } = require('express');
const { userLogin, userSignup, isUserLoggedin, userSignInWithGoogle } = require('../controllers/auth.controller');
const { user_protect } = require('../middlewares/auth.middleware');
const {editUserDetails} = require('../controllers/user.controller')
const {addTocart, deleteFromCart, getCartItem} = require('../controllers/cart.controller')

const router = Router();


router.post('/signup', userSignup);
router.post('/login', userLogin);
router.post('/google', userSignInWithGoogle);
router.get('/is-user-loggedin', isUserLoggedin);

router.use(user_protect);

router.patch('/edit-details', editUserDetails)

//cart related
router.post('/add-to-cart/:productId', addTocart)
router.delete('/delete-from-cart/:productId', deleteFromCart)
router.get('/get-cart-item', getCartItem)

module.exports = router;
