import { NextFunction, Request, Response } from "express";
import Comment from "../models/Comment";

// Create a new comment
export const createComment = async (req: Request, res: Response, next: NextFunction) => {
  const { comment, userId, articleId } = req.body;

  if (!comment || !userId || !articleId) {
    return res.status(400).json({ error: "Comment, userId, and articleId are required." });
  }

  try {
    const newComment = await Comment.create({ comment, userId, articleId });
    return res.status(201).json(newComment);
  } catch (error) {
    console.error("Create Comment Error:", error);
    return res.status(500).json({ error: "Error creating comment." });
  }
};

// Get all comments for a specific article
export const getCommentsByArticle = async (req: Request, res: Response, next: NextFunction) => {
  const { articleId } = req.params;

  try {
    const comments = await Comment.findAll({ where: { articleId } });
    return res.status(200).json(comments);
  } catch (error) {
    console.error("Get Comments Error:", error);
    return res.status(500).json({ error: "Error fetching comments." });
  }
};

// Update a comment by ID
export const updateComment = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { comment } = req.body;

  try {
    const existingComment = await Comment.findByPk(id);
    if (!existingComment) {
      return res.status(404).json({ error: "Comment not found." });
    }

    existingComment.comment = comment || existingComment.comment;
    await existingComment.save();
    return res.status(200).json(existingComment);
  } catch (error) {
    console.error("Update Comment Error:", error);
    return res.status(500).json({ error: "Failed to update comment." });
  }
};

// Delete a comment by ID
export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Comment ID is required." });
  }

  try {
    const deleted = await Comment.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ error: "Comment not found." });
    }

    return res.status(204).send();
  } catch (error) {
    console.error("Error deleting comment:", error);
    return res.status(500).json({ error: "Internal Server Error." });
  }
};
