import express from 'express';
import verifyJwt from '../middlewares/auth.middleware.js';
import { githubStats, updateGithub } from '../controllers/settings.controller.js';

const router = express.Router();
router.post('/platform/githubStats',githubStats)
router.post('/platform/updateGithub',verifyJwt, updateGithub)

export default router;