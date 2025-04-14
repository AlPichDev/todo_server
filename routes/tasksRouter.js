import { Router } from "express";
import { addNewOneTask, getTasks, updateTask, deleteTask } from "../controllers/tasksController.js";
import { authenicateToken } from '../middleware/authToken.js'

export let router = Router()

router.route('/')
    .all(authenicateToken)
    .get(getTasks)
    .post(addNewOneTask)
router.route('/:id')
    .all(authenicateToken)
    .put(updateTask)
    .delete(deleteTask)