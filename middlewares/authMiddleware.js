function requireLogin(req, res, next) {
    const { userSession } = req.cookies;
    if (!userSession || userSession !== 'valid-session-id') {
      return res.status(401).json({ message: 'Unauthorized: Login required.' });
    }
    next();
  }
  
  module.exports = { requireLogin };
  