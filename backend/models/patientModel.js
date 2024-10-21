const mongoose = require('mongoose')

const Schema = mongoose.Schema

const patientSchema = new Schema({
    fname: {
        type: String,
        required: true,
        trim: true
    },
    lname: {
        type: String,
        required: true,
        trim: true
    },
    telephone: {
        type: String,
        required: true,
        // match: /^[+]?[1]?[-\s]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    dob: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Patient', patientSchema)