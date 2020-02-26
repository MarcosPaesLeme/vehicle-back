const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    vehicle: {
        type: String,
        required: true,
        lowercase: true,
    },
    brand: {
        type: String,
        required: true,
        lowercase: true,
    },
    year: {
        type: Number,
        required: true
    },
    updated:{
        type: Date,
    },
    created:{
        type: Date,
        default: Date
    },
    description: {
        type: String
    },
    active: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('Vehicles', schema, 'vehicles')