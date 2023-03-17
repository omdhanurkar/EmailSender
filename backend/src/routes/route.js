const express = require("express");
const { sendMail, getDetails, sendMailToAll } = require("../controllers/sendMail");
const router = express();

const csvController = require("../controllers/csvController");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync("public")) {
            fs.mkdirSync("public");
        }

        if (!fs.existsSync("public/csv")) {
            fs.mkdirSync("public/csv");
        }

        cb(null, "public/csv");
    },
    filename: function (req, file, cb) {
        cb(null,file.originalname);
    },
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        var ext = path.extname(file.originalname);
 
        if (ext !== ".csv") {
            return cb(new Error("Only csvs are allowed!"));
        }

        cb(null, true);
    },
});


//post create new media
router.post(
    "/create",
    upload.single('csvFile'),
    csvController.create
);



router.post("/sendmail", sendMail)

router.post("/sendMailToAll", sendMailToAll)


router.get("/get", getDetails)





// app.post('/start', function (req, res) {

// });
module.exports = router