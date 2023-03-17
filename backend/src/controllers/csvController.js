
const csv = require('csvtojson');



const User = require("../models/clientModel");


exports.create = async (req, res) => {
    
    try {
        
        let userData =[]
        csv()
        .fromFile(req.file.path)
        .then( async(response)=>{
            for(let x=0;x<response.length;x++){
                userData.push({
                    name:response[x].name, 
                    number:response[x].number,
                    email:response[x].email
                })
            }
            await User.insertMany(userData)
        })

        return res.status(200).send("ok")
    } catch (error) {
        res.status(400).json(error)
    }
};