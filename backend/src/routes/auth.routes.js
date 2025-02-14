import express from 'express';
import { getUserProfile, logIn, logOut, signUp } from '../controllers/auth.controller.js';
import verifyJwt from '../middlewares/auth.middleware.js';
const router = express.Router();

router.post('/signup', signUp);
router.post('/login', logIn);
router.post('/logout',verifyJwt, logOut);
router.get('/profile', verifyJwt, getUserProfile);


export default router;