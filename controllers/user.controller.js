import User from "../models/user.model.js";

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find()
        res.status(200).json({
            success: true,
            data: users

        })
    } catch (error) {
        next(error)
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select("-password")

        if (!user) {
            const error = new Error('User not found')
            error.statusCode = 404
            throw error
        }

        res.status(200).json({
            success: true,
            data: user

        })
    } catch (error) {
        next(error)
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const { name, email } = req.body
        if (req.user._id.toString() !== req.params.id) {
            const error = new Error('you are not the owner of this account')
            error.statusCode = 401
            throw error
        }
        const newUser = await User.findByIdAndUpdate(req.params.id, {name, email}, {new:true, runValidators:true})
        res.status(200).json({
            success: true,
            data: newUser
        })
    } catch (error) {
        next(error)
    }
}