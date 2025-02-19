import express from 'express';
import verifyJwt from '../middlewares/auth.middleware.js';
import { addSkill, createDashboard, editLanguage, getAll, getDashboard, getLeetcode, refreshAll, updateLeetcode } from '../controllers/dashboard.controllr.js';

const router = express.Router();

router.post('/createDashboard',verifyJwt,createDashboard);
router.get('/getDashboard',verifyJwt, getDashboard)
router.post('/addSkill',verifyJwt, addSkill);
router.post('/editLanguage',verifyJwt, editLanguage);
router.post('/leetcode', getLeetcode);
router.post('/updateLeetcode',verifyJwt, updateLeetcode);
router.post('/refresh', refreshAll);
router.get('/getAll', getAll);


export default router;