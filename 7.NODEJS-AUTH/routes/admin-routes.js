const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth-middleware.js');
const isAdminMiddleware = require('../middleware/admin-middleware.js');



router.get('/welcome',authMiddleware, isAdminMiddleware ,(req, res) => {
    res.json({
        message: 'Welcome to the home page!'
    });
});

module.exports = router;