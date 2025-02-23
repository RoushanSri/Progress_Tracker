import express from 'express';
import verifyJwt from '../middlewares/auth.middleware.js';
import { checkFacebook, checkInstagram, checkLinkedIn, checkTwitter } from '../controllers/settings.controller.js';

const router = express.Router();

router.post('/socials/instagram',verifyJwt, checkInstagram)
router.post('/socials/facebook',verifyJwt, checkFacebook)
router.post('/socials/twitter',verifyJwt, checkTwitter)
router.post('/socials/linkedin',verifyJwt, checkLinkedIn)

export default router;