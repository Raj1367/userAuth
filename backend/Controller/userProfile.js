const userModel = require("../Model/UserModel")

const userProfileController = async (req, res) => {

    try {

        const user = await userModel.findById(req.userId).select("-password")

        res.status(200).json({
            message: "user details",
            data: user,
            success: true,
            error: false
        })
    }

    catch(err) {
        res.status(500).json({
            message: err.message || err,
            data: token,
            success: true,
            error: false
        })
    }
}


module.exports = userProfileController