import { Router } from "express";
import postController from "../controller/post.controller.js";

const postRouter = Router();

postRouter.post("/create-post", postController.createPost);

postRouter.get("/", postController.getPost);

postRouter.put("/update-post", postController.updatePost);
export default postRouter;
