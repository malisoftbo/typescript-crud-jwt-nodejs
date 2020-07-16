import { signin } from "controllers/auth.controller";
import { Router } from "express"
import user from "models/user";
const router: Router = Router();
import { userValidator } from "../auth/authValidate"

import { Signinn, Signup, Profile } from "../controllers/auth.controller"

router.post('/signin', Signinn);
router.post('/signup', Signup);
router.get('/profile', userValidator, Profile);

export default router;