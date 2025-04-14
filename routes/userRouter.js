import { Router } from "express";
import { loginUser, registerUser } from '../controllers/userController.js'

export let router = Router()

router.route('/login')
    .post(loginUser)
router.route('/register')
    .post(registerUser)
