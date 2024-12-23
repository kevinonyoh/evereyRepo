import { Router } from 'express';
import { createComment, getCommentsByArticle, deleteComment, updateComment } from '../controllers/commentController';
import { auth } from '../middleware/auth';
// import auth from '../middleware/auth';

const router = Router();

// router.use(auth);

router.post('/comment', auth, createComment); // create a comment
router.get('/:articleId/comment', auth, getCommentsByArticle); // get all comment for a specific article
router.put('/comment/:id', auth, updateComment); // update a comment
router.delete('/comment/:id', auth, deleteComment); // delete a comment

export default router;
