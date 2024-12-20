import { NextFunction, Request, Response } from 'express';
import Comment from '../models/Comment';

// Create a new comment
export const createComment = async (req: Request, res: Response, next: NextFunction) => {
    const { comment, userId, articleId } = req.body; 
    try {
        const newComment = await Comment.create({ comment, userId, articleId });
        return res.status(201).json(newComment);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error creating comment' });
    }
};


// Get all comments for a specific article
export const getCommentsByArticle = async (req: Request, res: Response, next: NextFunction) => {
  const { articleId } = req.params;
  try {
    const comments = await Comment.findAll({ where: { articleId } });
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching comments' });
  }
};

// Update a comment by ID
export const updateComment = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params; 
  const { comment } = req.body; 

  try {
      const existingComment = await Comment.findByPk(id); 
      if (!existingComment) {
          return res.status(404).json({ error: 'Comment not found' }); 
      }

      existingComment.comment = comment; 
      await existingComment.save(); 

      return res.status(200).json(existingComment);
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to update comment' }); 
  }
};


// Delete a comment
export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const result = await Comment.destroy({ where: { commentId: id } }); 
    if (result === 0) {
      return res.status(404).json({ message: 'Comment not found' }); 
    }
    return res.status(204).json(); 
  } catch (error) {
    console.error(error); 
    return res.status(500).json({ error: 'Error deleting comment' }); 
  }
};

