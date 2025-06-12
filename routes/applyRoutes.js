const express = require('express');
const router = express.Router();
const { submitApplication, getApplicants } = require('../controllers/applyController');
 


router.post('/', submitApplication);
router.get('/', getApplicants);

module.exports = router;
