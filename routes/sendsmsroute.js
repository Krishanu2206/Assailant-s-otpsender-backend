const express = require("express");
const router = express.Router();
const {sendsmspostrequestcontroller, sendotppostrequestcontroller, verifyotpcontroller} = require("../controllers/smscontroller");

router.post("/sendsms", sendsmspostrequestcontroller);
router.post("/verify", verifyotpcontroller);
router.post("/sendotp", sendotppostrequestcontroller); 

module.exports = router;
