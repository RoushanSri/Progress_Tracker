import express from 'express';
import { getUserProfile, logIn, logOut, signUp, updateAvatar, updatePassword, updateUsername } from '../controllers/auth.controller.js';
import verifyJwt from '../middlewares/auth.middleware.js';
const router = express.Router();

router.post('/signup', signUp);
router.post('/login', logIn);
router.post('/logout',verifyJwt, logOut);
router.get('/profile', verifyJwt, getUserProfile);
router.post('/uploadAvatar',verifyJwt, updateAvatar);
router.post('/password',verifyJwt, updatePassword);
router.post('/updateUsername',verifyJwt, updateUsername);


export default router;