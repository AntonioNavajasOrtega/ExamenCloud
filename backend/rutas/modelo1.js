const express = require("express");
const router = express.Router();

const modelo1Controller = require("../controllers/modelo1Controller");

const verifyTokenMiddleware = require("../rutas/middleware");

router.use(verifyTokenMiddleware)

//CRUD de entidad1. 
router.get("/", modelo1Controller.getAll); // listar 
router.get("/:id", modelo1Controller.get); // obtener 
router.post("/", modelo1Controller.create); // crear 
router.put("/:id", modelo1Controller.update); // actualizar 
router.delete("/:id", modelo1Controller.del); // eliminar 


module.exports = router;
