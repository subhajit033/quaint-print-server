const {Router} = require('express');
// const {uploadPhotos} = require('../controllers/upload.controller')
const upload = require('../utils/multer')

const router = Router();
router.get("/", (req, res)=>{
    res.status(200).json({
        status: true
    })
})

router.post('/uploadart', upload.single('uploadArt'))

module.exports = router;