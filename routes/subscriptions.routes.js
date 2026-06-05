import {Router} from "express";
import authorize from "../middleware/auth.middleware.js";
import {
    cancelSubscriptionById,
    createSubscription,
    getAllRenewals,
    getAllSubscriptions, getSubscriptionById,
    getUserSubscriptions, updateSubscriptionById
} from "../controllers/subscription.controller.js";
import authorizeRole from "../middleware/role.middleware.js";

const subscriptionsRouter = Router()

subscriptionsRouter.get(`/`, authorize, authorizeRole('admin'), getAllSubscriptions)

subscriptionsRouter.get(`/user/:id`, authorize, getUserSubscriptions)

subscriptionsRouter.get(`/upcoming-renewals/:id`, authorize, getAllRenewals)

subscriptionsRouter.post(`/user/:id`, authorize, createSubscription)

subscriptionsRouter.get(`/:id`, authorize, getSubscriptionById)

subscriptionsRouter.put(`/:id/cancel`, authorize, cancelSubscriptionById)

subscriptionsRouter.put(`/:id`, authorize, authorizeRole('admin'), updateSubscriptionById)

export default subscriptionsRouter