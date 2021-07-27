const { model, Schema } = require("mongoose");

const carSchema = new Schema(
  {
    veiculo: {
      type: String,
      unique: true,
      required: true,
    },
    marca: {
      type: String,
      required: true,
    },
    ano: {
      type: Number,
      required: true,
    },
    descripcion: String,
    vendido: Boolean,
  },
  { timestamps: true }
);

carSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
const Car = model("Car", carSchema);

module.exports = Car;
