import { Router } from "express";
import { checkUser, handleLogin, handleLogout } from "../controllers/auth.controller.js";
import { authDynamic } from "../middlewares/auth.middleware.js";

const authRouter=Router();

authRouter.post("/login",handleLogin)
authRouter.post("/logout",authDynamic,handleLogout)
authRouter.get("/check",authDynamic,checkUser)

export default authRouter;