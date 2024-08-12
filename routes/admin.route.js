const {Router} = require('express')
const {adminLogin, approveProduct} = require('../controllers/admin.controller');
const {admin_protect, restrictToAdmins} = require('../middlewares/auth.middleware')
const router = Router();

router.post('/login', adminLogin);

router.use(admin_protect);

router.patch('/approve-product/:productId', restrictToAdmins('admin'), approveProduct);


module.exports = router;