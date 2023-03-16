const express = require("express");
const { sendMail, getDetails, sendMailToAll } = require("../controllers/sendMail");
const router = express();



router.post("/sendmail", sendMail)

router.post("/sendMailToAll", sendMailToAll)


router.get("/get", getDetails)



// app.post('/start', function (req, res) {

// });
module.exports = router