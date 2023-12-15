
const verifyTokenMiddleware = async (req,res,next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({succes: false, error: "Token no proporcionado"});
    }

    try {

        const cleanedToken = token.replace("Bearer ", "");

        const ticket = await cliente.verifyIdToken({
                idToken: cleanedToken,
                audience: "934310162741-e74bp9o07ua6kiit7kgeu0qfinljc8oh.apps.googleusercontent.com"
        });

        const payload = ticket.getPayload();

        req.user = payload;


    } catch (error) {
        res.status(401).json({succes: false, error: "Token no válido"});
    }
}

module.exports = verifyTokenMiddleware;