const express=require('express');
const authMiddleware=require('../middleware/auth-middleware.js');
const router=express.Router();


router.get('/welcome',authMiddleware ,(req, res) => {

    const{username, id, role} = req.userInfo;
    res.json({
      message: 'Welcome to the home page!',
      user: {
        username: username,
        id: id,
        role: role
      }
    });
});

module.exports = router;