const express = require("express");
const { sendMail,addDetails,getDetails } = require("../controllers/sendMail");
const router = express();



router.post("/sendmail", sendMail)

router.get("/get", getDetails)



// app.post('/start', function (req, res) {

// });
module.exports = router