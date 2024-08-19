const {Router} = require('express');
const {uploadToClould} = require('../controllers/upload.controller')
const upload = require('../utils/multer')

const router = Router();
router.get("/", (req, res)=>{
    res.status(200).json({
        status: true
    })
})

router.post('/upload-asset', upload.single('uploadArt'), uploadToClould)

module.exports = router;