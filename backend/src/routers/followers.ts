import { Router } from "express";
import { add, countAllFollows, followsCounter, getAll, getFollows, getOne, remove, sendCSV } from "../controllers/followers/controller";

const router = Router();

router.get('/', getAll);
router.get('/:id', getOne);
router.get('/counter/:id', followsCounter); //Get all follows number
router.get('/follows/:id', getFollows); // If user follow
router.get('/statistics', countAllFollows); // Get all the vacations follows
router.get('/csv', sendCSV); // Get all the vacations follows
router.post('/', add); // Add Follow
router.delete('/:id', remove);// Remove Follow

export default router;