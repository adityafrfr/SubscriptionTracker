import {Router} from "express";

const subscriptionsRouter = Router()

subscriptionsRouter.get(`/`, (req, res) => {
    res.send({title: 'get all subscriptions'})
})

subscriptionsRouter.get(`/:id`, (req, res) => {
    res.send({title: 'get subscriptions details'})
})

subscriptionsRouter.post(`/`, (req, res) => {
    res.send({title: 'Create subscriptions'})
})

subscriptionsRouter.put(`/:id`, (req, res) => {
    res.send({title: 'Update a subscription'})
})

subscriptionsRouter.delete(`/:id`, (req, res) => {
    res.send({title: 'delete subscription'})
})

subscriptionsRouter.get(`/users/:id`, (req, res) => {
    res.send({title: 'get all user subscriptions'})
})

subscriptionsRouter.get(`/:id/cancel`, (req, res) => {
    res.send({title: 'cancel subscriptions'})
})
subscriptionsRouter.get(`/upcoming-renewals`, (req, res) => {
    res.send({title: 'get all upcoming renewals'})
})
export default subscriptionsRouter