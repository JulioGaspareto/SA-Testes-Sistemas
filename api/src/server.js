import express from 'express'
import usuarioRoutes from './routes/usuarioRoutes.js'

const PORT = 3000
const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    res.send("API Good Coffee ☕")
})

app.use('/usuarios', usuarioRoutes)

app.listen(PORT, () => {
    console.log(`API rodando em: http://localhost:${PORT}`)
})
