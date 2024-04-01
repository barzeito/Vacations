import { Router } from "express";
import validate from "../middlewares/input-validation";
import { getAll, getOne } from "../controllers/users/controller";

const router = Router();

router.get('/', getAll);
router.get('/:id', getOne);

export default router;