const express = require("express");
const router = express.Router();

const refreshTokenController = require("../controllers/refreshToken.Controller");


router.post("/refresh",refreshTokenController);

module.exports = router;