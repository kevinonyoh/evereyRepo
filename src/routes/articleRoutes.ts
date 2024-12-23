import { Router } from 'express';
import { createArticle, getArticles, getArticle, updateArticle, deleteArticle } from '../controllers/articleController';
import { auth } from '../middleware/auth';
// import auth from '../middleware/auth';

const router = Router();

// router.use(auth);

router.post('/create', auth, createArticle); // Create a new article
router.get('/articles', auth, getArticles); // Get all articles
router.get('/:id', auth, getArticle); // Get a specific article by ID
router.put('/:id', auth, updateArticle); // Update a specific article by ID
router.delete('/:id', auth, deleteArticle); // Delete a specific article by ID

export default router;