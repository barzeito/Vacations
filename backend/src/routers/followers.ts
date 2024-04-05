import { Router } from "express";
import { add, followsCounter, getAll, getFollows, getOne, remove } from "../controllers/followers/controller";

const router = Router();

router.get('/', getAll);
router.get('/:id', getOne);
router.get('/counter/:id', followsCounter); //Get all follows number
router.get('/follows/:id', getFollows); // If user follow
router.post('/', add); // Add Follow
router.delete('/:id', remove);// Remove Follow

export default router;