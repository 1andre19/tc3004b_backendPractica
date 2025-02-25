import express from "express";
import indexRoutes from "./routes/index.routes.js";

const app = express();
const port = 5000;

app.use(indexRoutes);

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});


