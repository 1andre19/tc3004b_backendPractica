import "dotenv/config"
import express from "express";
import indexRoutes from "./routes/index.routes.js";
import itemsRoutes from "./routes/items.routes.js";
import loginRoutes from "./routes/login.routes.js";
import cors from "cors";

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true 
}));

app.use(indexRoutes);
app.use(itemsRoutes);
app.use(loginRoutes);

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});


