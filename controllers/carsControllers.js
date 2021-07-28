const Car = require("../models/Car");
const { validationResult } = require("express-validator");

exports.get_cars = async (req, res, next) => {
  const cars = await Car.find({});
  if (cars !== null && cars.length > 0) {
    return res.status(200).json(cars);
  }
  res.status(404).end();
};

exports.get_car_id = (req, res, next) => {
  Car.findById(req.params.id)
    .then((carid) => {
      if (carid !== null) {
        return res.json(carid);
      }
      res.status(404).end();
    })
    .catch((err) => {
      res.status(400).end();
    });
};

exports.create_cars = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty() || !errors == undefined) {
    return next({ error: "params is requieres" });
  }
  const car = req.body;
  if (!car.veiculo) {
    return res
      .status(400)
      .json({ error: `requiered "veiculo" field is missing` });
  }
  const newCar = new Car({
    veiculo: car.veiculo,
    marca: car.marca,
    ano: car.año,
    descripcion: car.descripcion,
    vendido: car.vendido,
  });
  newCar
    .save()
    .then((savedCar) => {
      res.json(savedCar);
    })
    .catch((err) => {
      next(err);
    });
};

exports.delete_car = (req, res, next) => {
  const { id } = req.params;
  try {
    Car.findByIdAndDelete(id)
      .then(() => {
        res.status(204).end();
      })
      .catch((err) => {
        next(err);
      });
  } catch (error) {
    next(error);
  }
};

exports.put_car = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty() || !errors == undefined) {
    return next({ error: "params is requieres" });
  }

  const { id } = req.params;
  const car = req.body;
  const newCar = {
    veiculo: car.veiculo,
    marca: car.marca,
    ano: car.año,
    descripcion: car.descripcion,
    vendido: car.vendido,
  };
  Car.findByIdAndUpdate(id, newCar, { new: true })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      next(err);
    });
};

exports.patch_car = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty() || !errors == undefined) {
    return next({ error: "params is requieres" });
  }
  const { id } = req.params;
  const { vendido } = req.body;
  const car = await Car.findById(id);
  if (car.vendido != vendido) {
    car.vendido = vendido;
  }
  Car.findByIdAndUpdate(id, car, { new: true })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(400).end();
    });
};

exports.search_cars = async (req, res, next) => {
  const data = req.query;
  Car.find(data)
    .then((resp) => {
      if (resp !== null && resp.length > 0) {
        return res.json(resp);
      }
      res.status(400).end();
    })
    .catch((err) => {
      res.status(400).end();
    });
};
