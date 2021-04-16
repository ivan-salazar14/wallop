import jwt from "jsonwebtoken";


const verify = (req, res, next) => {
    let authHeader = req.headers['authorization']
    if (authHeader == null) return res.sendStatus(403)

    try {
        authHeader = authHeader.replace('Bearer ', '')
        jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET as string, (err: any, user: any) => {

            if (err) return res.status(403).send({ message: "El token ha expirado" });

            req.user = user
            next();
        })
    } catch (error) {
        return res.status(401).send()
    }
}

export {
    verify
};