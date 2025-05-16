import jwt from "jsonwebtoken";
import { Router } from "express";

export const validateJWT = Router();

validateJWT.use((req, res, next) => {
    let token = req.headers.authorization;

    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }

    
    if (!token) {
        res.status(401).json({ "messsage": "JWT required" });
        return;
    }

    if (!token.startsWith("Bearer")) {
        res.status(401).json({ "messsage": "Invalid header format" });
        return;
    }

    token = token.split(" ")[1];

    jwt.verify(token, process.env.JWT, (err, decoded) => {
        if (err) {
            res.status(401).json({ "messsage": "Invalid JWT" });
            return;
        }
        req.decoded = decoded;
        next();
    });
});
