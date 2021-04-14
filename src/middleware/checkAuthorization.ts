import jwt from "jsonwebtoken";


const verify = (req, res, next) => {
    const authHeader = req.headers['authorization']
    let accessToken = req.cookies.jwt    //    const token = authHeader && authHeader.split(' ')[1]

    if (accessToken == null) return res.sendStatus(403)

    try {
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string, (err: any, user: any) => {
            console.log(err)

            if (err) return res.sendStatus(403)

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