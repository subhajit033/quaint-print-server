const cloudinary = require('cloudinary').v2;
const { unlinkSync } = require('fs');
const path = require('path');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnclould = async (fileName, userphoto) => {
  // console.log(fileName);
  if (!fileName) return null;

  const filePath = path.join(__dirname, '..', 'public', 'temp', fileName);

  let url = null;
  try {
    const res = await cloudinary.uploader.upload(filePath, {
      resource_type: 'image',
    });
    // console.log(res);

    //resize the image if it is avatar image
    if (userphoto) {
      url = await cloudinary.url(res.public_id, {
        width: 500,
        height: 500,
        crop: 'crop',
      });
      unlinkSync(filePath);
      return url;
    }
    unlinkSync(filePath);
    return res.url;
  } catch (err) {
    console.log(err);
    unlinkSync(filePath);
    return null;
  }
};

const uriToClold = async (imgSrc) => {
  //let url = null;
  try {
    const res = await cloudinary.uploader.upload(imgSrc);
    console.log(res.url);
  } catch (e) {
    console.log(e);
  }
};

module.exports = { uploadOnclould, uriToClold };
