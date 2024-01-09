const catchAsync = require('../../../utils/catchAsync');
const appError = require("../../../utils/appError");
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.authentication = catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return next(new appError("Token not provided !! Authentication failed !!", 400));
    try{
        var decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.id = decoded.user.id;
        next();
        
    }
    catch (error){
        return next(new appError('Invalid token. Please log in again!', 401));
    }
});


exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({ username, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

