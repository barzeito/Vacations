import { Router } from "express";
import validate from "../middlewares/input-validation";
import { isAdmin, login, signUp } from "../controllers/auth/controller";
import { loginValidator, signupValidator } from "../controllers/auth/validator";
import enforceGuest from "../middlewares/enforce-guest";

const router = Router();
// router.use(enforceGuest);

router.post('/signup', validate(signupValidator), signUp);
router.post('/login', validate(loginValidator), login);
router.post('/role/:id', isAdmin);


export default router;