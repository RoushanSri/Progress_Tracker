import express from "express";
import { addMaterial, getMaterials } from "../controllers/material.controller.js";
import verifyJwt from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/addMaterial',verifyJwt,addMaterial)
router.get('/getMaterials',verifyJwt,getMaterials)

export default router;