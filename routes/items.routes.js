import { getPong, getIndex } from "../controllers/index.controllers.js";
import { Router } from "express";

const router = Router();

router.get("/", getIndex);

router.get("/ping", getPong);

export default router;
