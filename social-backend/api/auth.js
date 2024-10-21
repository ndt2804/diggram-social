import { Router } from "express";
import { auth } from '../middlewares/auth.js'

import {
    registerUser,
    logInUser,
    refreshToken,
    getUser,
    updateUser,
    changePassword,
    resetPassword,
    updatePassword,
    verifyEmail,
    signOutUser
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/auth/register", registerUser);
authRouter.post("/auth/login", logInUser);
authRouter.post("/auth/sign-out", auth, signOutUser);

authRouter.post('/refresh-token', refreshToken)

authRouter.get('/user/:slug', getUser)

authRouter.put('/user/:slug/settings', auth, updateUser)
authRouter.put('/user/:slug/changePassword', auth, changePassword)
authRouter.post('/resetPassword', resetPassword)
authRouter.get('/updatePassword', verifyEmail)
authRouter.post('/updatePassword', updatePassword)

export default authRouter;
