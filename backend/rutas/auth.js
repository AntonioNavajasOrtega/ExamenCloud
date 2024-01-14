const express = require("express");
const router = express.Router();

const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client("934310162741-e74bp9o07ua6kiit7kgeu0qfinljc8oh.apps.googleusercontent.com");

const Log = require("../modelos/modelLog");

router.post("/logged", async (req,res) => {
    console.log("Solicitud recibida en auth/logged")
    const { token } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: "934310162741-e74bp9o07ua6kiit7kgeu0qfinljc8oh.apps.googleusercontent.com"
        })
        const payload = ticket.getPayload();
        const usuario = payload.email;
        const caducidad = new Date(payload.exp * 1000); // Convierte la caducidad a milisegundos
        const nuevoLog = new Log({
            usuario,
            caducidad,
            token,
            });
    await nuevoLog.save(); // Guarda el log en la base de datos

        res.status(200).json({succes: true });
    } catch (error) {
        res.status(401).json({succes: false, error: 'Token no válido'});
    }

});

module.exports = router;