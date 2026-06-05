import {Router} from "express";
import authorize from "../middleware/auth.middleware.js";
import {createSubscription, getUserSubscriptions} from "../controllers/subscription.controller.js";

const subscriptionsRouter = Router()

subscriptionsRouter.get(`/`, (req, res) => {
    res.send({title: 'get all subscriptions'})
})

subscriptionsRouter.get(`/:id`, (req, res) => {
    res.send({title: 'get subscriptions details'})
})

subscriptionsRouter.post(`/`,authorize, createSubscription)

subscriptionsRouter.put(`/:id`, (req, res) => {
    res.send({title: 'Update a subscription'})
})

subscriptionsRouter.delete(`/:id`, (req, res) => {
    res.send({title: 'delete subscription'})
})

subscriptionsRouter.get(`/users/:id`,authorize, getUserSubscriptions)

subscriptionsRouter.put(`/:id/cancel`, (req, res) => {
    res.send({title: 'cancel subscriptions'})
})
subscriptionsRouter.put(`/upcoming-renewals`, (req, res) => {
    res.send({title: 'get all upcoming renewals'})
})
export default subscriptionsRouter