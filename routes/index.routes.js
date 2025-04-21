import { Router } from "express";
import { getPong, getIndex } from "../controllers/index.controllers.js";
import { getItems, getItem, postItem, deleteItem, putItem } from "../controllers/items.controllers.js";
import { validateJWT } from "../utils/jwt.js";

const router = Router();

router.get("/items/", validateJWT, getItems);
router.get("/items/:id", validateJWT, getItem);
router.post("/items/", validateJWT, postItem);
router.put("/items/", validateJWT, putItem);
router.delete("/items/:id", validateJWT, deleteItem)

export default router;


