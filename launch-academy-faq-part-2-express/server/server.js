import express from "express"
import path from "path"
import { fileURLToPath } from 'url'
import logger from "morgan"
import bodyParser from "body-parser"
import hbsMiddleware from "express-handlebars"
import fs from "fs"
import _ from "lodash"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(logger("dev"))
app.use(express.json())

app.use(express.static(path.join(__dirname, "../public")))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const questionsPath = path.join(__dirname, "../questions.json")

const questionsJson = () => {
  return JSON.parse(fs.readFileSync(questionsPath).toString())
}

const newQuestionId = () => {
  const questions = questionsJson()
  const maxQuestion = _.maxBy(questions, question => question.id)
  return maxQuestion.id + 1
}

const updateQuestionDataJson = (questions) => {
  const data = questions
  fs.writeFileSync(questionsPath, JSON.stringify(data))
}

app.get("/", (req, res) => {
  res.send("Hello from the backend")
})

// required for step three
app.get("/api/v1/launchers", (req, res) => {
  const jsonString = fs.readFileSync(path.join(__dirname, "../launchers.json")).toString()
  res.json(JSON.parse(jsonString))
})

app.get("/api/v1/questions", (req, res) => {
  const jsonString = fs.readFileSync(path.join(__dirname, "../questions.json")).toString()
  res.json(JSON.parse(jsonString))
})


app.post("/api/v1/questions", (req, res) => {
  const {question, answer} = req.body
  if (question && answer){
    const newQuestion = {
      id: newQuestionId(),
      question: question,
      answer: answer
    }
    const questions = questionsJson()
    questions.push(newQuestion)
    updateQuestionDataJson(questions)
    res.status(201).json(newQuestion)
  } else {
    res.status(422).json({ name: ["Fields can't be blank"] })
  }
})

app.get("/api/v1/launchers/:id", (req, res) =>{
  let grab = JSON.parse(fs.readFileSync(path.join(__dirname, "../launchers.json")).toString())
  let launcher = grab.find(person => person.id == req.params.id)
  res.json(launcher)
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"))
})

app.listen(3000, "0.0.0.0", () => {
  console.log("Server is listening...")
})

export default app
