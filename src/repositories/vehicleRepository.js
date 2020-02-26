'use strict'

const mongoose = require('mongoose');
const Vehicle = require('../models/vehicleModel');

exports.getVehicles = async () => {
    return await Vehicle.find().lean();
}

exports.getVehicleDetail = async (vehicleId) => {
    return await Vehicle.findById(vehicleId)
    .lean();
}

exports.postNewVehicle = async (vehicle) => {
    let newVehicle = new Vehicle(vehicle);
    return await newVehicle.save();
}

exports.updateAVehicle = async (vehicleId, vehicle) => {
    return await Vehicle.updateOne({
        _id: vehicleId
    },  {
        $set: vehicle
    })
    .lean();
}