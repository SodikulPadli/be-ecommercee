const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.send({
      status: 'failed',
      message: 'Access denied!',
    });
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY); 
    req.user = verified;
    next(); 
  } catch (error) {
    
    res.send({
      status: 'failed',
      message: 'Invalid token',
    });
  }
};