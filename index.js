const express = require('express')
const app = express()
const port = 3000

app.post('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(process.env.PORT || 3000,
    () => console.log("Server is running..."));