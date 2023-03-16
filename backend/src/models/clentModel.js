const mongoose = require("mongoose")

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    number: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        require: true
    }
},
    { timestamps: true })

module.exports = mongoose.model("Client", clientSchema)