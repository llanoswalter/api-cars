const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const carsControllers = require("../controllers/carsControllers");

module.exports = function () {
  router.get("/", function (req, res, next) {
    res.send("hello world");
  });

  router.get("/veiculos", carsControllers.get_cars);
  router.get("/buscarVeiculos", carsControllers.search_cars);
  router.get("/veiculos/:id", carsControllers.get_car_id);
  router.post(
    "/veiculos",
    body("año", "is requierd params").exists(),
    body("veiculo", "is requierd params").exists(),
    body("marca", "is requierd params").exists(),
    carsControllers.create_cars
  );
  router.delete("/veiculos/:id", carsControllers.delete_car);
  router.put(
    "/veiculos/:id",
    body("año", "is requierd params").exists(),
    body("veiculo", "is requierd params").exists(),
    body("marca", "is requierd params").exists(),
    carsControllers.put_car
  );
  router.patch(
    "/veiculos/:id",
    body("vendido", "is requierd params").exists(),
    carsControllers.patch_car
  );

  return router;
};
