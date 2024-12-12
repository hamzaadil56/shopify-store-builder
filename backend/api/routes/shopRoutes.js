const express = require('express');
const { getShopInfo, createTheme } = require('../controllers/shopController');

const router = express.Router();

router.post('/shop', getShopInfo);
router.post('/create-theme', createTheme);

module.exports = router;