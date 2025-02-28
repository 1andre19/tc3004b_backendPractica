import pool from "../utils/postgre.js";

export const login = async (req, res) => {
    try {
        const text = `SELECT * FROM users WHERE username=$1`;
        const values = [req.body.username];
        const data = await pool.query(text, values);
        console.log(data.rows);
        let isLogin = data.rows[0].password === req.body.password;
        res.status(200).json({ isLogin: isLogin })
    } catch (err) {
        return res.sendStatus(500).json({ msg: "something went wrong!" });
    }
}
