const { login, register, verify, refreshToken } = require('../controllers/auth.controller');

const router = require('express').Router();


router.post('/login',login);
router.post('/register',register)
router.get('/verify/:token',verify);
router.post('/refresh',refreshToken)

module.exports = router;