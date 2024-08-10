const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // console.log(path.join(__dirname, '..', 'public', 'temp'));
    cb(null, `${path.join(__dirname, '..', 'public', 'temp')}`);
  },
  filename: (req, file, cb) => {
    console.log(file);
    //file = req.file
    const ext = file.mimetype.split('/')[1];
    req.filename = `user-${Date.now()}.${ext}`;
    cb(null, req.filename);
  }
});

const upload = multer({
  storage,
  limits: {
    // file size is in bytes
    fileSize: 5000000
  }
});
module.exports = upload;
