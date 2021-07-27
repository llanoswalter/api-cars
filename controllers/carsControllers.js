const Car = require("../models/Car");

exports.get_cars = async (req, res, next) => {
  const cars = await Car.find({});
  if (cars !== null) {
    return res.json(cars);
  }
};

exports.get_car_id = (req, res, next) => {
  const car = Car.findById(req.params.id)
    .then((carid) => {
      if (car !== null) {
        return res.json(carid);
      }
      res.status(404).end();
    })
    .catch((err) => {
      res.status(400).end();
    });
};

exports.create_cars = async (req, res, next) => {
  const car = res.body;
  if (!car.veiculo) {
    return res
      .status(400)
      .json({ error: `requiered "veiculo" field is missing` });
  }
  const newCar = new Car({
    veiculo: car.veiculo,
    marca: car.marca,
    marca: car.marca,
    ano: car.ano,
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
  const car = res.body;
  const newCar = {
    veiculo: car.veiculo,
    marca: car.marca,
    marca: car.marca,
    ano: car.ano,
    descripcion: car.descripcion,
    vendido: car.vendido,
  };
  Car.findByIdAndUpdate(id, newCar, { new: true })
    .then((result) => {
      response.json(result);
    })
    .catch((err) => {
      res.status(400).end();
    });
};

exports.patch_car = async (req, res, next) => {
  const { id } = req.params;
  const { vendido } = res.body;
  const car = Car.findById(id);
  if (car.vendido != vendido) {
    car.vendido = vendido;
  }
  Car.findByIdAndUpdate(id, car, { new: true })
    .then((result) => {
      response.json(result);
    })
    .catch((err) => {
      res.status(400).end();
    });
};
