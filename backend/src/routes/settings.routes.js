import express from 'express';
import verifyJwt from '../middlewares/auth.middleware.js';
import { checkFacebook, checkInstagram, checkLinkedIn, checkTwitter, githubStats, updateGithub } from '../controllers/settings.controller.js';

const router = express.Router();

router.post('/socials/instagram',verifyJwt, checkInstagram)
router.post('/socials/facebook',verifyJwt, checkFacebook)
router.post('/socials/twitter',verifyJwt, checkTwitter)
router.post('/socials/linkedin',verifyJwt, checkLinkedIn)
router.post('/platform/githubStats',githubStats)
router.post('/platform/updateGithub',verifyJwt, updateGithub)

export default router;