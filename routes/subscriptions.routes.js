import {Router} from "express";
import authorize from "../middleware/auth.middleware.js";
import {createSubscription, getAllSubscriptions, getUserSubscriptions} from "../controllers/subscription.controller.js";
import authorizeRole from "../middleware/role.middleware.js";

const subscriptionsRouter = Router()

subscriptionsRouter.get(`/`, authorize, authorizeRole('admin'), getAllSubscriptions)

subscriptionsRouter.get(`/user/:id`, authorize, getUserSubscriptions)

subscriptionsRouter.get(`/upcoming-renewals`, (req, res) => {
    // TODO: get upcoming renewals logic
    res.send({title: 'get all upcoming renewals'})
})

subscriptionsRouter.post(`/user/:id`, authorize, createSubscription)

subscriptionsRouter.get(`/:id`, (req, res) => {
    // TODO: get single subscription by id logic
    res.send({title: 'get subscription details'})
})

subscriptionsRouter.put(`/:id/cancel`, (req, res) => {
    // TODO: cancel subscription logic
    res.send({title: 'cancel subscription'})
})

subscriptionsRouter.put(`/:id`, (req, res) => {
    // TODO: update subscription logic
    res.send({title: 'Update a subscription'})
})

subscriptionsRouter.delete(`/:id`, (req, res) => {
    // TODO: delete subscription logic
    res.send({title: 'delete subscription'})
})

export default subscriptionsRouter