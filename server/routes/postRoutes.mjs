import { Router } from 'express';
import { addPost, getAllPosts, likePost, dislikePost, commentPost } from '../controllers/postController.mjs';

const router = Router();

router.route('/').get(getAllPosts);
router.route('/addPost').post(addPost);
router.route('/likePost').post(likePost);
router.route('/dislikePost').post(dislikePost);
router.route('/commentPost').post(commentPost);

export default router;