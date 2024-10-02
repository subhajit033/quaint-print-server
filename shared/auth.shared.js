const jwt = require('jsonwebtoken');
require('dotenv').config();

const signToken = (userId, role) => {
  return jwt.sign({ id: userId, role: role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN, //90d after jwt token will expire and user have to sign up agin if the signature
    //correct also
  });
};

const createAndSendToken = (user, statusCode, res, tokenName, role) => {
  const token = signToken(user._id, role);
  //remove password from output
  if (user.password) user.password = undefined;
  const cookieOptions = {
    //in expires is saved as date in config file so we have to convert it into a mili second
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: false,
    sameSite: 'None',
   
  };
	

  

  res.cookie(tokenName, token, cookieOptions);
  res.status(statusCode).json({
    status: true,
    token,
    data: {
      data: user,
    },
  });
};

module.exports = { signToken, createAndSendToken };
