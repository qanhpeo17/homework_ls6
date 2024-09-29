import { Router } from "express";
import commentController from "../controller/comment.controller.js";

const cmtRouter = Router();

cmtRouter.post("/create-comment", commentController.createComment);
cmtRouter.get("/");
cmtRouter.put("/update-comment", commentController.updateComment);

export default cmtRouter;
