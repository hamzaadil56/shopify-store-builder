const express = require("express");
const {
  getShopInfo,
  createTheme,
  publishTheme,
} = require("../controllers/shopController");

const router = express.Router();

router.post("/shop", getShopInfo);
router.post("/create-theme", createTheme);
router.post("/publish-theme", publishTheme);

module.exports = router;
