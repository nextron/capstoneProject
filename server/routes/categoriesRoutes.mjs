import { Router } from 'express';
import { getAllCategories, addCategory } from '../controllers/categoryController.mjs';

const router = Router();

router.route('/').get(getAllCategories);
router.route('/addCategory').post(addCategory);

export default router;