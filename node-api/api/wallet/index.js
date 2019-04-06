const express = require('express');
const router = express.Router();
const ctrl = require('./wallet.ctrl');

router.post('/ethereum', ctrl.create_wallet);

router.post('/candidate/vote', ctrl.candidate_vote);
router.get('/candidate/vote', ctrl.get_candidate_info);

module.exports = router;
