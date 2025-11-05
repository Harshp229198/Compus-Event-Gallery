const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log(authHeader); 

  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ 
      success: false,
      message: 'Access denied, no token provided. please login first.'
    });
  }
  
  //decode the token

  try{
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    console.log(req.user);

    req.userInfo = decodedToken;
    next();
    
  }catch (error) {
    return res.status(500).json({ 
      success: false,
      message: 'Invalid token, please login again.'
    });
  }

   
}

module.exports = authMiddleware;