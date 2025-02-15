import { Router } from "express";
import {
  createComment,
  getCommentsByArticle,
  updateComment,
  deleteComment,
} from "../controllers/commentController";

const router = Router();

router.get("/:articleId", getCommentsByArticle);
router.post("/", createComment);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

export default router;
