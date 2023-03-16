const express = require("express");
const { sendMail } = require("../controllers/sendMail");
const router = express();
// const db = require("../models/")


router.post("/sendmail", sendMail)



// app.post('/start', function (req, res) {

// });
module.exports = router