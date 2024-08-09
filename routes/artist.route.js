const {Router} = require('express')
const {addArtist} = require('../controllers/artist.controller')

const router = Router();

router.route('/').post(addArtist).get((req, res)=>{
    res.status(200).json({
        ststus: true,
        message: 'ok'
    })
});

module.exports = router;