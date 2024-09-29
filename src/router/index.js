import { Router } from "express";
import authRouter from "./auth.router.js";
import cmtRouter from "./comment.router.js";
import postRouter from "./post.router.js";
import authorizationToken from "../middleware/auth.mdw.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/comment", authorizationToken, cmtRouter);
router.use("/post", authorizationToken, postRouter);
export default router;
