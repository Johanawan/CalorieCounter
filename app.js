const express = require("express")
const bodyParser = require("body-parser")
const request = require("request");

// dotenv to hide API key.
require('dotenv').config()

const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res) {
    const firstName = req.body.fName
    const lastName = req.body.lName
    const email = req.body.email
    const https = require("https")

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data)

    const url = "https://us7.api.mailchimp.com/3.0/lists/163aa671e6"

    api_key = process.env.API_KEY
    auth_join = "johan:" + String(api_key)

    const options = {
        method: "POST",
        auth: auth_join,
    }

    const request = https.request(url, options, function(response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        } else {
            res.sendFile(__dirname + "/failure.html")
        }

        response.on("data", function(data) {
            
        })
    })

    request.write(jsonData)
    request.end()
})

app.post("/failure", function(req, res) {
    res.redirect("/")
})



app.listen(process.env.PORT || 8000, function() {
    console.log("Server is running on port 8000.")
})

// fcb6b7bf1022eac7346e1be03c650514-us7
// 163aa671e6