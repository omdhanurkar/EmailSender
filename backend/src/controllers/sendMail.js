const clientModel = require("../models/clentModel")
const nodemailer = require('nodemailer');
require('dotenv').config();
const Mailgen = require('mailgen');


const sendMail = async (req, res) => {
    try {
        const { name, email } = req.body;
        // console.log(req.body)
        let testAccount = await nodemailer.createTestAccount();

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports 
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            },
        });

        let MailGenerator = new Mailgen({
            theme: "default",
            product: {
                name: "Mechodal",
                link: 'https://mailgen.js/'
            }
        })

        let response = {
            body: {
                name: name,
                intro: "You are shortlisted !",
                outro: "Looking forward for your responce"
            }
        }

        let mail = MailGenerator.generate(response)

        let message = {
            from: process.env.EMAIL, // sender address
            to: email, // list of receivers
            subject: 'hello omprakash dhanukar this test mail send by om', // Subject line
            text: 'This is a test email',// plain text body
            html: mail
        }


        transporter.sendMail(message).then((info) => {
            return res.status(201)
                .json({
                    msg: "you should receive an email",
                    info: info.messageId,
                    preview: nodemailer.getTestMessageUrl(info)
                })
        })
        await clientModel.create(req.body)

    } catch (error) {
        return res.status(400).send({ status: false, message: error.message });

    }
}


const getDetails = async (req, res) => {
    try {

        let get = await clientModel.find()         // distructered bcoz we will put more than 1 key in queryParams  
        return res.status(200).send(get)

    } catch (error) {
        return res.status(400).send({ status: false, message: error.message });

    }
}

module.exports = { sendMail, getDetails }