const Car = require("../models/Car");

exports.get_cars = async (req, res, next) => {
  const cars = await Car.find({});
  if (cars !== null && cars.length > 0) {
    return res.json(cars);
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
  newCar.save().then((savedCar) => {
    res.json(savedCar);
  });
};

exports.delete_car = async (req, res, next) => {
  const { id } = req.params;
  const respuesta = await Car.findByIdAndDelete(id);
  if (respuesta === null) return res.sendStatus(404);

  res.status(204).end();
};

exports.put_car = (req, res, next) => {
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
      res.status(400).end();
    });
};

exports.patch_car = async (req, res, next) => {
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
