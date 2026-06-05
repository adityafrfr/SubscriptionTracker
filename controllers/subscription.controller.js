import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body, user: req.user._id,
        })

        res.status(201).json({
            success: true, data: subscription
        })
    } catch (error) {
        next(error)
    }
}

export const getUserSubscriptions = async (req, res, next) => {
    try {
        if (req.user._id.toString() !== req.params.id) {
            const error = new Error('you are not the owner of this account')
            error.statusCode = 401
            throw error
        }

        const subscriptions = await Subscription.find({user: req.params.id})
        res.status(200).json({
            success: true, data: subscriptions
        })
    } catch (error) {
        next(error)
    }
}

export const getAllSubscriptions = async (req, res, next) => {
    try {
        if (req.user.role !== 'admin') {
            const error = new Error('you are not authorised to access this')
            error.statusCode = 401
            throw error
        }
        const subscriptions = await Subscription.find({})
        res.status(200).json({
            success: true, data: subscriptions
        })

    } catch (error) {
        next(error)
    }
}

export const getAllRenewals = async (req, res, next) => {
    try {
        if (req.user._id.toString() !== req.params.id) {
            const error = new Error('Unauthorised')
            error.statusCode = 401
            throw error
        }

        const allSubscriptions = await Subscription.find({
            user: req.params.id, renewalDate: {$gte: new Date()}
        })

        res.status(200).json({
            success: true, data: allSubscriptions
        })
    } catch (error) {
        next(error)
    }
}

export const getSubscriptionById = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id)
        if (!subscription) {
            const error = new Error('No subscription by that id')
            error.statusCode = 404
            throw error
        }

        if (subscription.user.toString() !== req.user._id.toString()) {
            const error = new Error('unauthorised you are not the owner')
            error.statusCode = 401
            throw error
        }

        res.status(200).json({
            success: true, data: subscription
        })
    } catch (error) {
        next(error)
    }
}

export const cancelSubscriptionById = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id)
        if (!subscription) {
            const error = new Error('not on server')
            error.statusCode = 404
            throw error
        }

        if (subscription.user.toString() !== req.user._id.toString()) {
            const error = new Error('unauthorised you are not the owner')
            error.statusCode = 401
            throw error
        }

        if (subscription.status === 'cancelled') {
            const error = new Error('Subscription is already cancelled')
            error.statusCode = 400
            throw error
        }

        const newSubscription = await Subscription.findByIdAndUpdate(req.params.id, {status: 'cancelled'}, {new: true})

        res.status(200).json({
            success: true, data: newSubscription
        })

    } catch (error) {
        next(error)
    }
}

export const updateSubscriptionById = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id)
        if (!subscription) {
            const error = new Error('Subscription Doesnt exist')
            error.statusCode = 404
            throw error
        }

        if (req.user.role !== 'admin') {
            const error = new Error('unauthorised')
            error.statusCode = 403
            throw error
        }

        const {name, price, currency, frequency, category, paymentMethod, status} = req.body

        const newSubscription = await Subscription.findByIdAndUpdate(req.params.id, {
            name,
            price,
            currency,
            frequency,
            category,
            paymentMethod,
            status
        }, {new: true, runValidators: true})
        res.status(200).json({
            success: true,
            data: newSubscription
        })

    } catch (error) {
        next(error)
    }
}
