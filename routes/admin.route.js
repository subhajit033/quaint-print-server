const {Router} = require('express')
const {adminLogin} = require('../controllers/admin.controller');
const { route } = require('./artist.route');
const router = Router();

router.post('/login', adminLogin)

module.exports = router;