const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.body.token, process.env.JWT_PRV_KEY, null);
    req.userData = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      'token_issue': 'Auth failed'
    });
  }
};
