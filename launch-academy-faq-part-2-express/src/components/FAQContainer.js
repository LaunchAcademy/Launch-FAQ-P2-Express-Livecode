import React, { useState, useEffect } from 'react'
import Question from './Question';
import Questionform from './QuestionForm';

const FAQContainer = (props) => {
  const [questions, setQuestions] = useState([])
  const [selectedQuestion, setSelectedQuestion] = useState([])

  useEffect(() =>{
    fetch("/api/v1/questions")
      .then((response) => {
        if (response.ok){
          return response
        }
      })
      .then(response => response.json())
      .then(body => {
        setQuestions(body)
      })
    }, [])


  const toggleQuestionSelect = (id) => {
    if(id === selectedQuestion) {
      setSelectedQuestion(null)
    }
    else {
      setSelectedQuestion(id)
    }
  }

  const addQuestion = (formPayload) => {
  fetch("/api/v1/questions", {
    method: "POST",
    body: JSON.stringify(formPayload),
    headers: { "Content-Type": "application/json" }
  })
    .then(response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage)
        throw error
      }
    })
    .then(response => response.json())
    .then(body => {
      setQuestions([...questions, body])
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
}

  const questionListItems = questions.map(question => {
    let selected;
    if (selectedQuestion === question.id) {
      selected = true
    }

    let handleClick = () => { toggleQuestionSelect(question.id) }

    return(
      <Question
        key={question.id}
        question={question.question}
        answer={question.answer}
        selected={selected}
        handleClick={handleClick}
      />
    )
  })

  return(
    <div className='page'>
      <h1>We Are Here To Help</h1>
      <div className='question-list'>
        {questionListItems}
      </div>
      <Questionform addQuestion={addQuestion} />
    </div>
  )

}

export default FAQContainer;
