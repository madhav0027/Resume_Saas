const {steamGroqResponse, streamGroqResponse} = require('../controllers/groq.controller')
const router = require('express').Router();


router.post('/groq',streamGroqResponse);

module.exports = router;