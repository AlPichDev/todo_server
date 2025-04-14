import { pool } from "../config/db.js";

export let getTasks = async (req, res) => {
    try {
        let result = await pool.query('SELECT * FROM tasks WHERE user_id = $1', [req.user.userId])
        res.json(result.rows.sort((a, b) => a.id - b.id))
    } catch (err) {
        res.status(500).json(err)
    }
}
export let addNewOneTask = async (req, res) => {
    let { description } = req.body

    try {
        let result = await pool.query(
            'INSERT INTO tasks (description, done, user_id) VALUES ($1, $2, $3) RETURNING *',
            [description, false, req.user.userId]
        )
        res.status(201).json(result.rows[0])
    } catch (err) {
        res.status(500).json(err)
    }
}
export let updateTask = async (req, res) => {
    let { id } = req.params
    let { description, done } = req.body
    try {
        let result = await pool.query('SELECT * FROM tasks WHERE id = $1 AND user_id = $2', [id, req.user.userId])
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Задача не найдена' })
        }

        let updResult = await pool.query('UPDATE tasks SET description = $1, done = $2 WHERE id = $3', [description, done, id])
        res.json(updResult.rows[0])
    } catch (err) {
        res.status(500).json(err)
    }
}
export let deleteTask = async (req, res) => {
    let { id } = req.params

    try {
        let result = await pool.query('SELECT * FROM tasks WHERE id = $1 AND user_id = $2', [id, req.user.userId])
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Задача не найдена' })
        }

        await pool.query('DELETE FROM tasks WHERE id = $1', [id])
        res.status(204).json()
    } catch (err) {
        res.status(500).json(err)
    }
}