const express = require("express");
const router = express.Router();

const {loginUser , signupUser} = require("../controllers/user.Controller");

router.post("/signup",signupUser);
router.post("/signin",loginUser);

module.exports = router;