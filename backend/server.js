
const express = require("express");
const cors = require("cors");
const colors = require("picocolors");
const modelo1 = require("./rutas/modelo1");
const authRouter = require("./rutas/auth.js");


const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());
app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use("/modelo1", modelo1);
app.use("/auth", authRouter);


app.listen(PORT, () => {
  console.log(colors.bgGreen(`Server is running on port ${PORT}`));
});

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://antonio:parcial2@cluster0.fobgn9e.mongodb.net/ExamenCloud");

// Control de errores
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error de conexión a MongoDB:"));
db.once("open", () => {
  console.log(colors.bgGreen("Conectado a la base de datos MongoDB"));
});

app.use((err, req, res, next) => {
  console.error(colors.red(err.stack));
  res.status(500).json({ error: "Something went wrong!" });
});


