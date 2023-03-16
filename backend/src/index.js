const express = require("express")
const route = require("./routes/route")
const cors = require("cors")
const app = express();
const mongoose = require("mongoose")
require('dotenv').config();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/sendEmails", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

    .then(() => console.log("MongoDB is connected"))
    .catch(err => console.log(err.message))

app.use('/',route)

app.listen(5000,  ()=> {
    console.log('Express app running on port ' + 5000)
});