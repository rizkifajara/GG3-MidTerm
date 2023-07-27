const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
{
  username: {
    type: String,
    required: true,
  },
  post: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
    required: true,
  },
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = { Comment };