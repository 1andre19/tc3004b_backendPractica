import { Router } from "express";
import { getPong, getIndex } from "../controllers/index.controllers.js";
import { getItems, getItem, postItem, deleteItem, putItem } from "../controllers/items.controllers.js";

const router = Router();

router.get("/items/", getItems);
router.get("/items/:id", getItem);
router.post("/items/", postItem);
router.put("/items/", putItem);
router.delete("/items/:id", deleteItem)

export default router;


