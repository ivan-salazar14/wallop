import jwt from "jsonwebtoken";


const verify = (req, res, next) => {
    let authHeader = req.headers['authorization']

    console.log('authHeader', authHeader)
    if (authHeader == null) return res.sendStatus(403)

    try {
        authHeader = authHeader.replace('Bearer ', '')
        console.log('authHeader', authHeader)

        jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET as string, (err: any, user: any) => {
            console.log(err)

            if (err) return res.sendStatus(403)

            req.body = user

            next();
        })
    } catch (error) {
        return res.status(401).send()
    }
}

export {
    verify
};