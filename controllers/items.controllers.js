import pool from "../utils/postgre.js";


export const getItems = async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM items');
        console.log(data.rows);
        return res.send(data.rows);
    } catch (err) {
        return res.sendStatus(500).json({ msg: "something went wrong!" });
    }
};

export const getItem = async (req, res) => {
    try {
        const text = `SELECT * FROM items WHERE id=$1`;
        const id = req.params.id; // faaaak this, if i hard code the a string that is number this works
        const data = await pool.query(text, [id]);
        return res.send(data.rows);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "something went wrong!" });
    }
};

export const postItem = async (req, res) => {
    const text = `INSERT INTO items (id, name, price) values ($1, $2, $3)`;
    const values = [req.body.id, req.body.name, req.body.price];
    const data = await pool.query(text, values);
    res.status(200).json({ msg: "operation succesfull" });
};

export const deleteItem = async (req, res) => {
    try {
        const text = `DELETE FROM items WHERE id=$1`;
        const id = req.params.id;
        const data = await pool.query(text, [id]);
        res.status(200).json({ msg: "delete was succesfull" })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "something went wrong!" });
    }
};

export const putItem = async (req, res) => {
    try {
        const text = `UPDATE items SET name=$2, price=$3 WHERE id=$1`;
        const values = [req.body.id, req.body.name, req.body.price]
        const data = await pool.query(text, values)
        res.status(200).json({ msg: "put operation successfull" })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "something went wrong!" });
    }
}



