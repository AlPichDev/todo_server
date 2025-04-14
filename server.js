import express from 'express'
import cors from 'cors'
import { router as tasksRouter } from './routes/tasksRouter.js'
import { router as userRouter} from './routes/userRouter.js'

let app = express()
const PORT = process.env.PORT || 3001;
app.use(express.json())

app.use(cors({
    origin: ['https://todo-client-rho-lilac.vercel.app', 'http://localhost:3000'],
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
}))

app.use('/api/tasks', tasksRouter)
app.use('/api/user', userRouter)

app.listen(PORT, () => {
    console.log('Сервер запущен на http://localhost:' + PORT);
})