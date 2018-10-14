const request = require('request')

function urlBuilder(route){
    return `https://www.eventbriteapi.com/v3${route}/?token=${process.env.EVENTBRITE_TOKEN}`
}

const eventbriteClient = {
    getAllAttendees: ()=>{
        // TODO
    },
    getAttendeeByEmail: (email)=>{
        // TODO
    }
}

module.exports = eventbriteClient