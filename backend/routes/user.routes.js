const {user, logout} = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = require('express').Router();


router.get('/user',authMiddleware,user);
router.post('/logout',logout);

module.exports = router;