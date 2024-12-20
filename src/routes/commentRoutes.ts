import { Router } from 'express';
import { createComment, getCommentsByArticle, deleteComment, updateComment } from '../controllers/commentController';
// import auth from '../middleware/auth';

const router = Router();

// router.use(auth);

router.post('/comment', createComment); // create a comment
router.get('/:articleId/comment', getCommentsByArticle); // get all comment for a specific article
router.put('/:id', updateComment); // update a comment
router.delete('/:id', deleteComment); // delete a comment

export default router;
