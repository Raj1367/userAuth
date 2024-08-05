const userModel = require("../Model/UserModel")
const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSignInController = async (req, res) => {
    try {

        const { email, password } = req.body

        if (!email) {
            res.status(400).json({
                message: "please provide email",
                success: false,
                error: true
            })
        }

        if (!password) {
            res.status(400).json({
                message: "please provide password",
                success: false,
                error: true
            })
        }

        const user = await userModel.findOne({ email })

        if (!user) {
            res.status(400).json({
                message: "user does not exist",
                success: false,
                error: true
            })
        }

        else {

            bcrypt.compare(password, user.password, async (errBcrypt, resBcrypt) => {

                if (errBcrypt) {
                    return res.status(400).json({
                        message: "password does not match",
                        success: false,
                        error: true
                    })
                }

                const payload = {
                    _id: user._id,
                    email: user.email
                }

                const token = JWT.sign(payload, process.env.JWT_TOKEN_SECRET_KEY, { expiresIn: "12h" });
                console.log("token", token)

                const tokenOption = {
                    httpOnly: true,
                    secure: true
                }

                res.cookie("token", token, tokenOption).status(200).json({
                    message: "Login successfully",
                    data: token,
                    success: true,
                    error: false
                })

            });
        }

    }

    catch (err) {
        res.status(500).json({
            message: err.message || err,
            success: false,
            error: true
        })
    }
}

module.exports = userSignInController