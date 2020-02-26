"use strict";

const mongoose = require("mongoose");
const vehiclesRepository = require("../repositories/vehicleRepository");

exports.getVehicles = async (req, res) => {
 try{
    let vehicles = await vehiclesRepository.getVehicles();

  res.status(200).send({ vehicles });

} catch(err) {
    console.log(err);
    return res.status(400).send({ error: "Erro while get vehicles" })
}
};

exports.getVehicleDetail = async (req, res) => {
try {
  if (!req.params.veichleId)
    res.status(204).send({ message: "O id não foi informado" });

  let vehicle = await vehiclesRepository.getVehicleDetail(req.params.id);

  if (!vehicle) res.status(400).send({ message: "Veiculo não encontrado" });

  res.status(200).send(vehicle);
} catch(err) {
    console.log(err);
    return res.status(400).send({ error: "Erro while updating vehicle" });
}
};

exports.postNewVehicle = async (req, res) => {
  try {
    if (!req.body)
      res.status(204).send({
        message: "Não temos informações suficientes para criar um novo veiculo"
      });

    delete req.body._id;
    await vehiclesRepository.postNewVehicle(req.body);

    res.status(201).send({ nessage: "Veiculo criado com sucesso!" });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: "Erro while updating vehicle" });
  }
};

exports.putAVehicle = async (req, res) => {
  try {
    if (!req.body)
      res.status(204).send({
        message: "Não temos informações suficientes para criar um novo veiculo"
      });

    let vehicle = req.body;
    const vehicleId = req.params.veichleId;

    vehicle.updated = new Date();

    await vehiclesRepository.updateAVehicle(vehicleId, vehicle);

    res.status(201).send({ nessage: "Veiculo criado com sucesso!" });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: "Erro while updating vehicle" });
  }
};

exports.patchAVehicle = async (req, res) => {
  try {
    if (!req.body)
      res.status(204).send({
        message: "Não temos informações suficientes para criar um novo veiculo"
      });

    const vehicle = req.body;
    const vehicleId = req.params.veichleId;

    await vehiclesRepository.updateAVehicle(vehicleId, {
      active: !vehicle.active,
      updated: new Date()
    });

    res.status(201).send({ message: "Veiculo criado com sucesso!" });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: "Erro while updating vehicle" });
  }
};
