const express = require('express')
const router = express.Router()
const passwordless = require('passwordless')

// Get the model
const Attendee = require('../models/Attendee')

// POST an email address to request a magic link
router.post('/', 
    passwordless.requestToken(
        function(user, delivery, callback, req) {
            // Test whether the email exists in attendees table
            Attendee.findOne({
                email: user
            }, (err, document)=>{
                if (document){
                    console.log("😃  User found, sending magic link")
                    callback(null, document.id)
                } else {
                    console.log("😒  User not found. Email will NOT be sent")
                    callback(null, null)
                }
            })
        }),
    function(req, res) {
        // Success
        res.json({
            message: "Magic link has been sent"
        })
})

// POST a log out request
router.get('/logout', passwordless.logout(),
    function(req, res) {
        res.json({
            message: "That token has been logged out"
        })
})

module.exports = router