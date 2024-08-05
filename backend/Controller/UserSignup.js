const userModel = require("../Model/UserModel")
const bcrypt = require('bcryptjs');

const userSignUpController = async (req, res) => {

    try {
        const { email, password, name } = req.body

        if (!name) {
            res.status(400).json({
                message: "please provide name",
                error: true,
                success: false,
            })
        }

        else if (!email) {
            res.status(400).json({
                message: "please provide email",
                error: true,
                success: false,
            })
        }

        else if (!password) {
            res.status(400).json({
                message: "please provide password",
                error: true,
                success: false,
            })
        }


        const user = await userModel.findOne({ email })

        if (user) {
            res.status(400).json({
                message: "user already exists",
                error: true,
                success: false,
            })
        }

        bcrypt.genSalt(10, (err, salt) => {

            bcrypt.hash(password, salt, async (err, hash) => {

                if (err) {
                    return res.status(400).json({
                        message: err.message || err,
                        error: true,
                        success: false,
                    })
                }

                else {

                    const payload = {
                        ...req.body,
                        password: hash
                    }

                    const registerUser = new userModel(payload)
                    const saveUser = await registerUser.save()

                    res.status(201).json({
                        message: "user created successfully",
                        data: saveUser,
                        success: true,
                        error: false
                    })

                }

            });
        });

    } catch (err) {
        res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}

module.exports = userSignUpController