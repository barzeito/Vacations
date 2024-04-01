import { Router } from "express";
import { add, getAll, getOne, remove } from "../controllers/followers/controller";

const router = Router();

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', add);
router.delete('/:id', remove);


export default router;