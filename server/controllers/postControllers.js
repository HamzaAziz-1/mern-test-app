const db = require("../database/db");

const createDraft = async (req, res) => {
  const { title, content } = req.body;
  const author_id = req.user.id;

  const query =
    "INSERT INTO posts (title, content, author_id, status) VALUES (?, ?, ?, 'draft')";
  db.execute(query, [title, content, author_id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error creating draft", error: err });
    }
    res.status(201).json({
      message: "Draft created successfully",
      draftId: result.insertId,
    });
  });
};

const updateDraft = async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;
  const author_id = req.user.id;

  const query =
    "UPDATE posts SET title = ?, content = ? WHERE id = ? AND author_id = ? AND status = 'draft'";
  db.execute(query, [title, content, id, author_id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error updating draft", error: err });
    }
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Draft not found or not owned by user" });
    }
    res.status(200).json({ message: "Draft updated successfully" });
  });
};

const deleteDraft = async (req, res) => {
  const { id } = req.params;
  const author_id = req.user.id;

  const query =
    "DELETE FROM posts WHERE id = ? AND author_id = ? AND status = 'draft'";
  db.execute(query, [id, author_id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error deleting draft", error: err });
    }
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Draft not found or not owned by user" });
    }
    res.status(200).json({ message: "Draft deleted successfully" });
  });
};

const publishPost = async (req, res) => {
  const { id } = req.body; // assuming the draft ID to publish is sent in the body
  const author_id = req.user.id;

  const query =
    "UPDATE posts SET status = 'published' WHERE id = ? AND author_id = ?";
  db.execute(query, [id, author_id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error publishing post", error: err });
    }
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Draft not found or not owned by user" });
    }
    res.status(200).json({ message: "Post published successfully" });
  });
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const author_id = req.user.id;
  const { title, content } = req.body;
  const query =
    "UPDATE posts SET title = ?, content = ? WHERE id = ? AND author_id = ? AND status = 'published'";
  db.execute(query, [title, content, id, author_id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error updating post", error: err });
    }
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Post not found or not owned by user" });
    }
    res.status(200).json({ message: "Post updated successfully" });
  });
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const author_id = req.user.id;

  const query =
    "DELETE FROM posts WHERE id = ? AND author_id = ? AND status = 'published'";
  db.execute(query, [id, author_id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error deleting post", error: err });
    }
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Post not found or not owned by user" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  });
};

const getPosts = async (req, res) => {
  const query =
    "SELECT * FROM posts WHERE status = 'published'";
  db.execute(query, (err, posts) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching posts", error: err });
    }
    res.status(200).json({ posts });
  });
};

const getDrafts = async (req, res) => {
  const author_id = req.user.id;
  const query = "SELECT * FROM posts WHERE author_id = ? AND status = 'draft'";
  db.execute(query, [author_id], (err, drafts) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching drafts", error: err });
    }
    res.status(200).json({ drafts });
  });
};

module.exports = {
  createDraft,
  updateDraft,
  deleteDraft,
  publishPost,
  updatePost,
  deletePost,
  getPosts,
  getDrafts,
};
