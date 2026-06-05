import {Router} from "express";
import {getUser, getUsers, updateUser} from "../controllers/user.controller.js";
import authorize from "../middleware/auth.middleware.js";
import authorizeRole from "../middleware/role.middleware.js";
const userRouter = Router()
userRouter.get(`/`,authorize, authorizeRole('admin'), getUsers)

userRouter.get(`/:id`,authorize, getUser)

userRouter.put(`/:id`, authorize, updateUser)

userRouter.delete(`/:id`, (req, res) => {
    res.send({title: 'Delete User'})
})

export default userRouter