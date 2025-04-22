import express from "express";
import { registerUser, Login, getUserProfile, logout } from "../controller/user.controller.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const userRouter = express.Router()


userRouter.post('/user/register', registerUser)

userRouter.post('/user/login', Login)

userRouter.get('/user/me', authenticateUser, getUserProfile)

userRouter.get('/user/logout', logout)


export default userRouter

