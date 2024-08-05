const JWT = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {

    try {
        const token = req.cookies?.token
        console.log("token", token)

        if (!token) {
            return res.status(400).json({
                message: "Please Login...!",
                error: true,
                success: false
            })
        }

        JWT.verify(token, process.env.JWT_TOKEN_SECRET_KEY, (err, decoded) => {

            if (err) {
                console.log("error auth", err)
            }

            else {
                req.userId = decoded?._id
                next()
            }

        })

    }

    catch {
        res.status(500).json({
            message: err.message || err,
            data: token,
            success: true,
            error: false
        })
    }
}

module.exports = verifyToken