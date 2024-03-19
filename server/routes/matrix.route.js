import { Router } from "express";
import { matrixAdd } from '../controllers/matrix.controller.js';

const router = Router();

router.post('/add', matrixAdd);

export default router;