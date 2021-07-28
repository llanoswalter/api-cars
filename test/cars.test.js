const { text } = require("express");
const mongoose = require("mongoose");
const supertest = require("supertest");
const { app, server } = require("../index");
const Cars = require("../models/Car");
const api = supertest(app);
const initialCars = [
  {
    veiculo: "Q8",
    marca: "Audi",
    ano: 2016,
    descripcion: "gris como nuevo",
  },
  {
    veiculo: "Corolla ",
    marca: "Toyota ",
    ano: 2004,
    descripcion: "branco con buena chapa y pintura",
  },
];
beforeEach(async () => {
  await Cars.deleteMany({});
  let carObject = new Cars(initialCars[0]);
  await carObject.save();
  carObject = new Cars(initialCars[1]);
  await carObject.save();
});

describe("GET Cars", () => {
  test("Cars are returned as json", async () => {
    await api
      .get("/veiculos")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("One Car for Id returned As json", async () => {
    const car = await Cars.findOne({ veiculo: "Q8" });
    await api
      .get(`/veiculos/${car.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("One Car if Id error", async () => {
    const car = await Cars.findOne({ veiculo: "Q8" });
    await api.get(`/veiculos/${car.id}1`).expect(400);
  });
});

describe("POST Cars", () => {
  test("create car if no exist request", async () => {
    await api.post("/veiculos").expect(402);
  });

  test("create car if no exist request", async () => {
    const newCar = {
      veiculo: "Fiesta",
      marca: "Ford",
      año: 2010,
      descripcion: "Negro como nuevo",
    };
    await api.post("/veiculos").send(newCar).expect(200);
  });

  test("create car if no exist one params in request", async () => {
    const newCar = {
      veiculo: "Fiesta",
      marca: "Ford",
      descripcion: "Negro como nuevo",
    };
    await api.post("/veiculos").send(newCar).expect(402);
  });
});

describe("DELETE Cars", () => {
  test("delete if not exist id", async () => {
    await api.delete("/veiculos").expect(404);
  });

  test("delete if exist id", async () => {
    const car = await Cars.findOne({ veiculo: "Q8" });
    await api.delete(`/veiculos/${car.id}`).expect(204);
  });

  test("delete if id error", async () => {
    const car = await Cars.findOne({ veiculo: "Q8" });
    await api.delete(`/veiculos/${car.id}1`).expect(404);
  });
});

afterAll(() => {
  mongoose.connection.close();
  server.close();
});
