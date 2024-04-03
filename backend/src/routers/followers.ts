import { Router } from "express";
import { add, followsCounter, getAll, getFollows, getOne, remove } from "../controllers/followers/controller";
import followers from "../models/followers/mysql";

const router = Router();

router.get('/', getAll);
router.get('/:id', getOne);
router.get('/counter/:id', followsCounter);
router.get('/follows/:id', getFollows);
router.post('/', add);
router.delete('/:id', remove);


export default router;