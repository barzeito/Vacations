import { Router } from "express";
import { add, getAll, getAllVacationsFollows, getOne, getUserFollows, getVacationsFollowsNumber, remove, sendCSV } from "../controllers/followers/controller";

const router = Router();

router.get('/', getAll);
router.get('/:id', getOne);
router.get('/counter/:id', getVacationsFollowsNumber);
router.get('/follows/:id', getUserFollows);
router.get('/statistics', getAllVacationsFollows);
router.get('/csv', sendCSV);
router.post('/', add);
router.delete('/:userId/:vacationId', remove);

export default router;