import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { pool } from '../config/db.js'

export let loginUser = async (req, res) => {
    let { password, email } = req.body
    try {
        let result = await pool.query('SELECT * FROM users WHERE email = $1', [email])
        let user = result.rows[0]

        if(!user){ // Идентификация
            return res.status(400).json({error: 'Пользователь не найден'})
        }

        let validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword){ //Аутентификация
            return res.status(400).json({error: 'Неверный пароль'})
        }

        let token = jwt.sign({userId: user.id},process.env.JWT_SECRET, {expiresIn: '1h'})
        res.json({token})
    } catch (err) {
        console.log(err);
        
        res.status(500).json(err)
    }
}

export let registerUser = async (req, res) => {
    let { username, password, email } = req.body
    let hashedPassword = await bcrypt.hash(password, 10)

    try {
        let result = await pool.query(
            'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *',
            [username, hashedPassword, email]
        )
        res.status(201).json(result.rows[0])
    } catch (err) {
        res.status(500).json(err)
    }
}