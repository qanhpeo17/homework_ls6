import PostModel from "../models/post.model.js";

const getPost = (req, res) => {
  res.status(200).json({
    Message: "Get POST",
  });
};
const createPost = async (req, res) => {
  try {
    const { title, content, isPublic } = req.body;
    const user = req.user;
    console.log(user);
    if (!title || !content || !isPublic) {
      return res.status(404).json({
        Message: "Thieu thong tin",
        Data: null,
      });
    }
    const newPost = {
      userId: user.id,
      title,
      content,
      isPublic,
    };
    const createNewPost = await PostModel.create(newPost);
    if (!createNewPost) {
      return res.status(500).json({
        error: "failed to create post",
      });
    }
    res.status(200).json({
      Message: "Post created successfully",
      // post: createNewPost,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
//chinh sua bai viet
const updatePost = async (req, res) => {
  try {
    const { postId, title, content, isPublic } = req.body;
    if (!title || !content || !isPublic) {
      return res.status(404).json({
        message: "Thieu thong tin",
        data: null,
      });
    }
    const user = req.user;
    const authUser = await PostModel.findOne({ userId: user.id });
    if (!authUser) {
      return res.status(401).json({
        message: "Ban khong co quyen chinh sua bai viet nay",
      });
    }
    const postIsExists = await PostModel.findById(postId);
    if (!postIsExists) {
      return res.status(404).json({
        message: "khong tim thay bai viet ban muon chinh sua",
      });
    }
    const postAfterUpdate = {
      title,
      content,
      isPublic,
    };

    const updatingPost = await PostModel.findByIdAndUpdate(
      postId,
      postAfterUpdate,
      { new: true }
    );
    res.status(201).json({
      Message: "Bai viet duoc chinh sua thanh cong!",
      updatingPost,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
const postController = {
  getPost,
  createPost,
  updatePost,
};
export default postController;
