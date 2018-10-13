const express = require('express')
const router = express.Router()

// Get the model
const Agendum = require('../models/Agendum')

// GET list of all agenda items for current user
router.get('/',
    // TODO
    
)

// POST a new agenda item with the event ID supplied in the query
router.post('/',
    // TODO
)

// DELETE the agenda item specified in the query
router.delete('/',
    // TODO
)

module.exports = router