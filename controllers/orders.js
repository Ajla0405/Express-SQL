import pool from "../db/server.js";

export const getAllOrders = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM orders`);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: err.message });
    console.log(error);
  }
};

export const getOneOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`SELECT * FROM orders WHERE id=$1`, [id]);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "getting one order didn't work" });
    console.log(error);
  }
};

export const createNewOrder = async (req, res) => {
  const { price, date, user_id } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO orders (price, date, user_id) VALUES ($1, $2, $3) RETURNING *`,
      [price, date, user_id]
    );
    res.status(201).json(result.rows[0]);
    console.log({ message: "Successfully created a new order" });
  } catch (error) {
    res.status(500).json({ message: "creating new order didn't work" });
    console.log(error);
  }
};

export const editOneOrder = async (req, res) => {
  const { id } = req.params;
  const { price, date, user_id } = req.body;
  try {
    const result = await pool.query(
      "UPDATE orders SET price = $1, date = $2, user_id = $3 WHERE id = $4 RETURNING *",
      [price, date, user_id, id]
    );
    if (result.rowCount === 0) {
      res.status(404).json({ message: "Order not found" });
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (error) {
    res.status(500).json({ message: "Editing order didn't work" });
    console.error(error);
  }
};

export const deleteOneOrder = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM orders WHERE ID = $1", [id]);
    res.status(200).json({ message: "order deleted" });
  } catch (err) {
    res.status(500).json({ message: "deleting order didn't work" });
    console.log(err);
  }
};
