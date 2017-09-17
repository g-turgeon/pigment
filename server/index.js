import express from 'express'
import chalk from 'chalk'
import bodyParser from 'body-parser'
import path from 'path'

const PORT = process.env.PORT || 3000

let app = express()

// App usage
app.use(bodyParser.json())

app.all('/*', (req, res) => {
  res.sendFile(__dirname + '/app/' + req.url)
})

app.listen(PORT, () => {
  console.log(chalk.bgYellow.black(`Listening to port ${PORT}`))
})
