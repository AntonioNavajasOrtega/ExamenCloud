// controller2.js
const Modelo1 = require("../modelos/modelo1");

// Lógica para obtener todos los elementos
async function getAll(req, res) {
    try {
        const modelos2 = await Modelo1.find();
        if(!modelos2){
            return res.status(404).json({ error: "Modelo1 no encontrado" });
          }
          else
          {
            res.json(modelos2);
          }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener todos los Modelo1");
    }
}

// Lógica para obtener un elemento por ID
async function get(req, res) {
    try {
        const id = req.params.id;
        const modelo1 = await Modelo1.findById(id);
        if(!modelo1)
        {
            return res.status(404).json({ error: "Modelo1 no encontrado" });
        }
        else
        {
            res.json(modelo1);
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener el Modelo1 por ID");
    }
}

// Lógica para crear un nuevo elemento
async function create(req, res) {
    try {
        const modelo1 = req.body;

        const modeloexiste = await Modelo1.findOne({
            anfitrion: modelo1.anfitrion,
            inicio: modelo1.inicio,
            direccion: modelo1.direccion
            
          });
    
          if (modeloexiste) {
            
            res.send("El Modelo1 ya estaban en la base de datos");
          } else {
            // Si el Evento no existe, créalo y agrégalo a la lista de nuevos productos
            const nuevoModelo = await Modelo1.create(modelo1);
            res.json(nuevoModelo);
          }


    } catch (error) {
        console.error(error);
        res.status(500).send("Error al crear un Modelo1 elemento");
    }
}

// Lógica para actualizar un elemento por ID
async function update(req, res) {
    try {
        const id = req.params.id;
        const datosActualizar = req.body;

        const modelo = await Modelo1.findById(id);

    if(!modelo){
      return res.status(404).json({ error: "Modelo1 no encontrado" });
    }
    else{
      const modelo = await Modelo1.findByIdAndUpdate(id, datosActualizar, {new: true, });
      
      res.status(200).json({ mensaje: "Modelo1 actualizado", modelo });
    }

        
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al actualizar el Modelo1 por ID");
    }
}

// Lógica para eliminar un elemento por ID
async function del(req, res) {
    const id = req.params.id;
    try {
        const modelo = await Modelo1.findById(id);

        if(!modelo)
        {
            return res.status(404).json({ error: "Modelo1 no encontrado" });
        }
        else
        {
            await Modelo1.findByIdAndDelete(id);
            res.status(204).send(); // Respuesta exitosa sin contenido
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al eliminar el Modelo1 por ID");
    }
}

module.exports = {
    getAll,
    get,
    create,
    update,
    del
};
