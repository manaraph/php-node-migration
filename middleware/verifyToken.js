const jwt = require('jsonwebtoken');
 
const verifyToken = (req, res, next) => {
  const bearerToken = req.headers['authorization'];

  if(typeof bearerToken !== 'undefined'){
    
    jwt.verify(req.token, process.env.SECRET, (err) => {
      if(err){
        res.status(403).json({
            message: 'Access denied'
        });
      }else{
        next();
      }
    })
  } else {
    res.status(403).json({
      message: 'Access denied'
    });
  }
};

module.exports = verifyToken