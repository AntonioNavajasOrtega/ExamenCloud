const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client("934310162741-e74bp9o07ua6kiit7kgeu0qfinljc8oh.apps.googleusercontent.com");


const verifyTokenMiddleware = async (req,res,next) => {
    const token = req.header("Authorization");
    console.log("Solicitud middleware")
    if (!token) {
        console.log("no hay token")
        return res.status(401).json({succes: false, error: "Token no proporcionado"});
        
    }

    try {

        const cleanedToken = token.replace("Bearer ", "");

        const ticket = await client.verifyIdToken({
                idToken: cleanedToken,
                audience: "934310162741-e74bp9o07ua6kiit7kgeu0qfinljc8oh.apps.googleusercontent.com"
        });

        const payload = ticket.getPayload();

        req.user = payload;

        next();
    } catch (error) {
        console.log("token no válido", error.message);
        res.status(401).json({succes: false, error: "Token no válido"});
    }
}

module.exports = verifyTokenMiddleware;