import { Router } from "express";
import {
  uploadArticle,
  updateArticle,
  getArticles,
  getArticleById,
  downloadArticle,
  deleteArticle,
  draftArticle,
  updateDraftArticle,
  getUserArticle,
  getArticleByDate,
  getArticlesByPublicationType,
} from "../controllers/articleController";

import { wrappedUploadMiddleware } from "../middleware/cloudinary";

import { hasRole } from "../middleware/authorize";

import { auth } from "../middleware/auth";

import { ArticleByDate, ArticleByPublicationType, CreateDraftArticle, UpdateDraftArticle } from "../dto/article.dto";

import { validationMiddleware } from "../middleware/expressDto";

const router = Router();

router.post("/details", auth, hasRole("User"), validationMiddleware(CreateDraftArticle), draftArticle);

router.post("/upload-article-file/:id", auth, hasRole("User"), wrappedUploadMiddleware("file"), uploadArticle);

router.put("/details/:id", auth, hasRole("User"), validationMiddleware(UpdateDraftArticle), updateDraftArticle)

router.put("/:id", auth, hasRole("User"), wrappedUploadMiddleware("file"), updateArticle);

router.get("/", auth, hasRole("User"), getArticles);

router.get("/details/:id", auth, hasRole("User"), getArticleById);

router.get('/date', auth, getArticleByDate);

router.get('/publication-type', auth, getArticlesByPublicationType);

router.get("/user-article", auth, hasRole("User"), getUserArticle);
 
router.get("/download/:id", auth, hasRole("User"), downloadArticle);

router.delete("/:id", auth, hasRole("User"), deleteArticle);

export default router;




