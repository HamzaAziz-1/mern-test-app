const express = require("express");
const router = express.Router();
const {
  createDraft,
  updateDraft,
  deleteDraft,
  publishPost,
  updatePost,
  deletePost,
  getPosts,
  getDrafts,
} = require("../controllers/postControllers");
const { authenticateUser } = require("../middlewares/authentication");

// Drafts
router.post("/drafts", authenticateUser, createDraft);
router.put("/drafts/:id", authenticateUser, updateDraft);
router.delete("/drafts/:id", authenticateUser, deleteDraft);
router.get("/drafts", authenticateUser, getDrafts);

// Posts
router.post("/publish", authenticateUser, publishPost);
router.put("/posts/:id", authenticateUser, updatePost);
router.delete("/posts/:id", authenticateUser, deletePost);
router.get("/posts", getPosts);

module.exports = router;
