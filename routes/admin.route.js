const { Router } = require('express');
const {
  adminLogin,
  approveProduct,
  getUnapprovedpdt,
} = require('../controllers/admin.controller');
const { getSingleProduct } = require('../controllers/product.controller');
const {
  uploadBanner,
  uploadBestDeal,
  uploadBestSeller,
  getBanner,
  getBestDeal,
  getBestSeller,
} = require('../controllers/content.controller');
const {
  admin_protect,
  restrictToAdmins,
} = require('../middlewares/auth.middleware');
const router = Router();

router.post('/login', adminLogin);

router.use(admin_protect);

router.get('/unapproved-pdt', getUnapprovedpdt);
router.patch(
  '/approve-product/:productId',
  restrictToAdmins('admin'),
  approveProduct
);
router.get('/product/:productId', getSingleProduct);
router.route('/banner').get(getBanner).post(uploadBanner);
router.route('/best-deal').get(getBestDeal).post(uploadBestDeal);
router.route('/best-seller').get(getBestSeller).post(uploadBestSeller);

module.exports = router;
