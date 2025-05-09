import jwt from "jsonwebtoken";
import { Router } from "express";

export const validateJWT = Router();

validateJWT.use((req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
        res.status(401).json({"messsage": "JWT required"});
        return;
    }

    if (!token.startsWith("Bearer")) {
        res.status(401).json({"messsage": "Invalid header format"});
        return;
    }

    jwt.verify(token, process.env.JWT, (err, decoded) => {
        if (err) {
            res.status(401).json({"messsage": "Invalid JWT"});
            return;
        }     
        req.decoded = decoded;
        next();
    });
    token = token.split(" ")[1];
});