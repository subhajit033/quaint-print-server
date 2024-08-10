const {Router}  = require('express')
const {userLogin, userSignup} = require('../controllers/auth.controller')

const router = Router();

router.get("/", (req, res)=>{
    res.status(200).json({
        status: true
    })
})

router.post('/signup', userSignup);
router.post('/login', userLogin);

module.exports = router;