const express = require("express");
const {
  getShopInfo,
  createTheme,
  publishTheme,
  getCollection,
  createProduct,
  getPublicationOfOnlineStore,
  publishProduct,
} = require("../controllers/shopController");
const {
  sendEmailAfterCreatingStore,
  createProfile,
  addProfile,
} = require("../controllers/sendEmails");

const router = express.Router();

router.post("/shop", getShopInfo);
router.post("/create-theme", createTheme);
router.post("/publish-theme", publishTheme);
router.post("/get-collection-id", getCollection);
router.post("/create-product", createProduct);
router.post("/getPublicationId", getPublicationOfOnlineStore);
router.post("/publishProduct", publishProduct);
router.post("/send-email-after-creating-store", sendEmailAfterCreatingStore);
router.post("/create-profile", createProfile);
router.post("/add-to-list", addProfile);

module.exports = router;
