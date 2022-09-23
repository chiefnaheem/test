import express from 'express';
const router = express.Router();
import { register, login, scoreFormInformation } from '../controller/user.controller';


router.route('/register').post(register)
router.route('/login').post(login);
router.route('/score').post(scoreFormInformation);


export default router;