const express = require("express");
const router = express.Router();

const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client("934310162741-e74bp9o07ua6kiit7kgeu0qfinljc8oh.apps.googleusercontent.com");

router.post("logged", async (req,res) => {
    console.log("Solicitud recibida en auth/logged")
    const { token } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: "934310162741-e74bp9o07ua6kiit7kgeu0qfinljc8oh.apps.googleusercontent.com"
        })
        const payload = ticket.getPayload();
        res.status(200).json({succes: true });
    } catch (error) {
        res.status(401).json({succes: false, error: 'Token no válido'});
    }

});

module.exports = router;