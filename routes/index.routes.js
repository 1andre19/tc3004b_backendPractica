import { Router } from "express";
import { getPong, getIndex } from "../controllers/index.controllers.js";

const router = Router();

router.get("/", getIndex);

router.get("/ping", getPong);

export default router;


