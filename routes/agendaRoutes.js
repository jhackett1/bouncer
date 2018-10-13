const express = require('express')
const router = express.Router()

// Get the model
const Agendum = require('../models/Agendum')

// GET list of all agenda items for current user
router.get('/', (req, res)=>{
    Agendum.find({
        userId: req.user
    }, (err, documents)=>{
        if (err) return res.status(500).json({message: err})
        res.status(200).json({
            agenda: documents
        })
    })
})

// POST a new agenda item with the event ID supplied in the query
router.post('/', (req, res)=>{
    let newAgendum = new Agendum({
        eventId: req.body.eventId,
        userId: req.user
    })
    newAgendum.save((err, document)=>{
        if (err) return res.status(500).json({message: err})
        res.status(201).json({
            message: "New agenda item saved"
        })
    })
})

// DELETE the agenda item specified in the query
router.delete('/', (req, res)=>{
    Agendum.deleteOne({
        eventId: req.body.eventId,
        userId: req.user.id
    }, (err)=>{
        if (err) return res.status(500).json({message: err})
        res.status(204).json({
            message: "Agenda item deleted"
        })
    })
})

module.exports = router