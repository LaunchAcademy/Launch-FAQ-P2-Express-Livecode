import React, { useState } from 'react'

const Questionform = props => {
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    answer: ""
  })

  const handleChange = event => {
    setNewQuestion({
      ...newQuestion,
      [event.currentTarget.id]: event.currentTarget.value
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    props.addQuestion(newQuestion)
    clearForm()
  }

  const clearForm = () => {
    setNewQuestion({
      question: "",
      answer: ""
    })
  }

  return(
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Question:
            <input 
              type="text" 
              id="question" 
              name="question"
              value={newQuestion.question}
              onChange={handleChange}
            >
            </input>
          </label>
        </div>
        <div>
          <label>Answer:
            <input 
              type="text" 
              id="answer" 
              name="answer"
              value={newQuestion.answer}
              onChange={handleChange}
            >
            </input>
          </label>
        </div>
        <div>
          <input type="submit" value="DO THE THANG!"></input>
          <input type="button" onClick={clearForm} value="Clear Form?"></input>
        </div>
      </form>
    </div>
  )
}

export default Questionform