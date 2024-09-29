import { Router } from "express";
import CommentModel from "../models/comment.model.js";

const commentRouter = Router();

const createComment = async (req, res) => {
  try {
    const { postId, content } = req.body;
    if (!postId || !content) {
      return res.status(404).json({
        message: "Thieu thong tin",
      });
    }
    const user = req.user;
    const newCmt = {
      userId: user.id,
      postId,
      content,
    };
    const insertNewCmt = await CommentModel.create(newCmt);
    if (!insertNewCmt) {
      return res.status(500).json({
        message: "Tao binh luan that bai",
      });
    }
    res.status(200).json({
      message: "Tao binh luan thanh cong",
      insertNewCmt,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const updateComment = async (req, res) => {
  try {
    const { cmtId, postId, content } = req.body;
    if (!cmtId || !postId || !content) {
      return res.status(404).json({
        message: "Thieu thong tin",
      });
    }
    const user = req.user;
    const authUser = await CommentModel.findOne({ userId: user.id });
    if (!authUser) {
      return res.status(401).json({
        message: "Ban khong co quyen chinh sua binh luan nay",
      });
    }
    const cmtIsExists = await CommentModel.findById(cmtId);
    if (!cmtIsExists) {
      return res.status(404).json({
        message: "Binh luan nay khong ton tai",
      });
    }

    const cmtAfterUpdate = {
      content,
    };
    const updatingCmt = await CommentModel.findByIdAndUpdate(
      cmtId,
      cmtAfterUpdate,
      { new: true }
    );
    res.status(201).json({
      message: "Binh luan duoc chinh sua thanh cong",
      updatingCmt,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
const commentController = {
  createComment,
  updateComment,
};
export default commentController;
