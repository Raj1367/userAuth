const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/database')
const router = require('./Routes/Router')
const app = express()
const PORT = 8080 || process.env.PORT

require('dotenv').config()

app.use(cors({
    origin: "https://user-auth-frontend-drab.vercel.app"
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())
app.use("/api", router)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on port " + PORT)
        console.log(`its alive on http://localhost:${PORT}`)
    })
})
