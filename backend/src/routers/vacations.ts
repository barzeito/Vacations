import { Router } from "express";
import validate from "../middlewares/input-validation";
import { add, getAll, getAllByBetweenDates, getAllByStartDate, getOne, patch, remove, update } from "../controllers/vacations/controller";
import enforceAdmin from "../middlewares/enforce-admin";
import addImageToBody from "../middlewares/add-image-to-body";
import uploadImage from "../middlewares/upload-image";
import { addVacationValidator } from "../controllers/vacations/validator";
import enforceAuth from "../middlewares/enforce-auth";

const router = Router();
router.use(enforceAuth);

router.get('/', getAll);
router.get('/:id', getOne);
router.get('/start-date/:date', getAllByStartDate);
router.get('/between-dates', getAllByBetweenDates);
router.post('/', addImageToBody, validate(addVacationValidator), uploadImage, add);
router.put('/:id', addImageToBody, uploadImage, update);
router.patch('/:id', addImageToBody, uploadImage, patch);
router.delete('/:id', enforceAdmin, remove);

export default router;