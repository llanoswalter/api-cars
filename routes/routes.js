const express = require("express");
const router = express.Router();

const carsControllers = require("../controllers/carsControllers");

module.exports = function () {
  router.get("/", function (req, res, next) {
    res.send("hello world");
  });

  router.get("/veiculos", carsControllers.get_cars);
  router.get("/veiculos/:id", carsControllers.get_car_id);
  router.post("/veiculos", carsControllers.create_cars);
  router.delete("/veiculos/:id", carsControllers.delete_car);
  router.put("/veiculos/:id", carsControllers.put_car);
  router.patch("/veiculos/:id", carsControllers.patch_car);
  return router;
};
