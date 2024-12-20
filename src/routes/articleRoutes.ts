import { Router } from 'express';
import { createArticle, getArticles, getArticle, updateArticle, deleteArticle } from '../controllers/articleController';
// import auth from '../middleware/auth';

const router = Router();

// router.use(auth);

router.post('/create', createArticle); // Create a new article
router.get('/articles', getArticles); // Get all articles
router.get('/:id', getArticle); // Get a specific article by ID
router.put('/:id', updateArticle); // Update a specific article by ID
router.delete('/:id', deleteArticle); // Delete a specific article by ID

export default router;