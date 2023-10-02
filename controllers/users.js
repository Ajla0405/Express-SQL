import pool from "../db/server.js";

export const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM users`);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }
};

export const getOneUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
    if (result.rowCount === 0) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    res.status(500).json({ message: "Getting one user didn't work" });
    console.error(error);
  }
};

export const createNewUser = async (req, res) => {
  const { first_name, last_name, age, active } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO users (first_name, last_name, age, active) VALUES ($1, $2, $3, $4) RETURNING *`,
      [first_name, last_name, age, active]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Creating new user didn't work" });
    console.error(error);
  }
};

export const editOneUser = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, age, active } = req.body;
  try {
    const result = await pool.query(
      "UPDATE users SET first_name = $1, last_name = $2, age = $3, active = $4 WHERE id = $5 RETURNING *",
      [first_name, last_name, age, active, id]
    );
    if (result.rowCount === 0) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    res.status(500).json({ message: "Editing user didn't work" });
    console.error(error);
  }
};

export const deleteOneUser = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Deleting user didn't work" });
    console.error(error);
  }
};
