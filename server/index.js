const cors = require("cors")
const express = require("express")
const jwt = require("jsonwebtoken")
const bodyParser = require("body-parser")

const auth = require("./auth")
const products = require("./products")
const authorizedMiddleware = require("./authorized")

const PORT = 3000
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('public'))

app.use("/api/auth", auth)
app.use("/api/products", products)

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})
