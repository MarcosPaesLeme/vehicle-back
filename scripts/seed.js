const Vehicles = require("../src/repositories/vehicleRepository"),
  co = require("co"),
  db = require("../bin/db"),
  axios = require("axios");

db.then(() => {
  co(async function() {
    try {
      const brands = await axios.get(
        "https://parallelum.com.br/fipe/api/v1/carros/marcas"
      );
      for (const brand of brands.data) {
        let vehicles = await axios.get(
          `https://parallelum.com.br/fipe/api/v1/carros/marcas/${brand.codigo}/modelos`
        );
        for (const brandVehicle of vehicles.data.modelos) {
          let yearsVehicle = await axios.get(
            `https://parallelum.com.br/fipe/api/v1/carros/marcas/${brand.codigo}/modelos/${brandVehicle.codigo}/anos`
          );
          for (const years of yearsVehicle.data) {
            let vehicle = await axios.get(
              `https://parallelum.com.br/fipe/api/v1/carros/marcas/${brand.codigo}/modelos/${brandVehicle.codigo}/anos/${years.codigo}`
            );
            let car = {
                vehicle: vehicle.data.Modelo,
                brand: vehicle.data.Marca,
                year: vehicle.data.AnoModelo,
                description: `Mês de refrência da consulta ${vehicle.data.MesReferencia}, valor do veículo ${vehicle.data.Valor} com tipo de combustível ${vehicle.data.Combustivel.toLowerCase()}`
            }
            
            await Vehicles.postNewVehicle(car);
            console.log('Cadastrado veiculo')
          }
        }
      }
    } catch (err) {
      console.error(err.stack);
    }
    process.exit();
  });
});
