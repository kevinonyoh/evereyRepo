import { Router } from "express";
import { CreateAdminDto, LoginAdminDto, VerifyTokenDto } from "../dto/dto";
import { validationMiddleware } from "../middleware/expressDto";
import { createAdmin, createBulkUser, loginAdmin, updateArticleStatus, verifyEmail, viewArticles } from "../controllers/adminController";
import { auth } from "../middleware/auth";
import multer from "multer";
import { ArticleByStatus } from "../dto/article.dto";
import { hasRole } from "../middleware/authorize";





const router = Router();

const upload = multer({ storage: multer.memoryStorage() });



router.post('/create', auth, hasRole("Admin"),  validationMiddleware(CreateAdminDto),  createAdmin);

router.post('/verify-email', auth, hasRole("Admin"), validationMiddleware(VerifyTokenDto), verifyEmail);

router.post('/login-admin', validationMiddleware(LoginAdminDto), loginAdmin);

router.get('/article', auth, hasRole("Admin"), viewArticles);

router.put('/article-status/:id',  auth, hasRole("Admin"), validationMiddleware(ArticleByStatus), updateArticleStatus );


router.post('/create-user',auth, hasRole("Admin"), upload.single('file'), createBulkUser);



export default router;