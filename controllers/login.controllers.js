import pool from "../utils/postgre.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export const login = async (req, res) => {
    try {
        const text = `SELECT * FROM users WHERE username=$1`;
        const values = [req.body.username];
        const data = await pool.query(text, values);

        if (data.rowCount === 0) {
            res.status(400).json({ message: "user not found", isLogin: false });
            return;
        }

        const storedPassword = data.rows[0].password;
        const [salt, storedHash] = storedPassword.split(':');

        const newMsg = salt + req.body.password;
        const hashing = crypto.createHash("sha512");
        const hash = hashing.update(newMsg).digest("base64url");

        const isLogin = (hash === storedHash);

        const token = jwt.sign({ sub: data.rows[0].id }, process.env.JWT, {
            expiresIn: "1h",
        });

        if (isLogin) {
            res.status(200).json({ message: "Login success", user: data.rows[0], isLogin: true, token: token });
            return;
        } else {
            res.status(400).json({ message: "Login failed", user: {}, isLogin: false });
            return;
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "something went wrong!" });
    }
}


export const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password required" });
        }

        const salt = crypto.randomBytes(16).toString("hex");
        const hash = crypto.createHash("sha512").update(salt + password).digest("base64url");
        const hashedPassword = `${salt}:${hash}`;

        await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [username, hashedPassword]);

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).json({ message: "Something went wrong!" });
    }
}
