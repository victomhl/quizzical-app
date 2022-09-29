import { useState, useEffect } from "react"
import {nanoid} from "nanoid"

function useQuizzical() {

    /********************************************************************
     **********  State definitions 
     ********************************************************************/

    const [makeAPIRequest, setMakeAPIRequest] = useState(false)
    const [quizCategories, setQuizCategories] = useState([])
    const [quiz, setQuiz] = useState({
        areParametersSet: false,
        isOver: false,
        isLoading: false,
        parameters: {
            amount: "5",
            category: "0",
            difficulty: "any",
            type: "any"
        },
        data: [],
        correctAnswers: 0
    })
    
    /********************************************************************
     **********  State change functions definitions 
     ********************************************************************/

    function updateQuiz(newPropertiesObj) {
        setQuiz(prevQuizState => ({...prevQuizState, ...newPropertiesObj}))
    }

    // Since the parameters is an object inside another object this function make the 
    // parameters update easier
    function changeQuizParamters(newParametersObj) {
        setQuiz(prevQuizState => (
        {...prevQuizState, parameters: {...prevQuizState.parameters, ...newParametersObj}}
        ))
    }

    // Make an API request with the parameters set by the user, making QuizPage
    // Component render
    function startQuiz() {
        console.log(generateURL(quiz.parameters))
        setMakeAPIRequest(true)
    }

    // 
    function endQuiz() {
        const correctAnswers = quiz.data.filter(quizzItem => 
            quizzItem.correct_answer === quizzItem.user_answer)

        updateQuiz({isOver: true, correctAnswers: correctAnswers.length})
    }

    // Makes another API request maintaining the same parameters
    function resetQuiz() {
        updateQuiz({isOver: false, data: [], correctAnswers: 0})
        setMakeAPIRequest(true)
    }

    function changeQuizStatus() {
        quiz.isOver ? resetQuiz() : endQuiz()
    }

    // Reset the quiz state, having as result the unmount of QuizPage Component and
    // the render of the IntroPage Component
    function quitQuiz() {
        setQuiz({
            areParametersSet: false,
            isOver: false,
            isLoading: false,
            parameters: {
                amount: "5",
                category: "0",
                difficulty: "any",
                type: "any"
            },
            data: [],
            correctAnswers: 0
        })
    }

    // Keeps track of changes to the parameters that are use to make the API request
    function handleParametersChange(event) {
        const {name, value} = event.target;
        changeQuizParamters({[name]: value})
    }

    // Keeps track of the answer on each question
    function changeAnswer(event, questionID) {
        const answerID = event.target.id

        const newData = quiz.data.map(quizItem => {
            return questionID !== quizItem.id ? quizItem: updatedUserAnswer(quizItem, answerID)
        })

        updateQuiz({data: newData})
    }

    /********************************************************************
     **********  Util functions definitions 
     ********************************************************************/

    // Take a set of parameters (amount, category, difficulty, and type) as an object
    // and return a url base on those parameters
    function generateURL(requestParameters) {
        
        // Base URL (Open trivia Database)
        let url = "https://opentdb.com/api.php?"
        
        // Transform 
        let arrayInfo = Object.entries(requestParameters)
        
        // Ensure that "amount" property will be the first element in the array 
        arrayInfo.sort((a, b) => a[0].localeCompare(b[0]))
        
        for (const [key, value] of arrayInfo) {
        
            if (value === "any" || value === "0") {
                continue
            }
            
            url = url + `&${key}=${value}`
        }
        
        return url
    }
    
    // Shuffle elements in an array using the Fisher-Yates algorithm
    function shuffleArray(array) {
        const newArray = array
    
        for (let i = newArray.length - 1; i > 0; i--) {       
            const j = Math.floor(Math.random() * (i + 1))
            const temp = newArray[i]
    
            newArray[i] = newArray[j]
            newArray[j] = temp
        }
        return newArray
    }
    
    // Takes the correct and incorrect answers, merge both answers in a new array
    // and finally shuffle to randomly change the position of each element after
    // mapping through the answers array
    function generateAnswersArray(correctAnswer, incorrectAnswers) {   
        const answers = [correctAnswer, ...incorrectAnswers]
    
        return shuffleArray(answers.map(answer => {
            return {
                name: answer.replaceAll(' ', '_'),
                value: answer,
                isCheck: false
            }
        }))
    }

    // Formats the data that come as response of the API request to the Open Trivia Database
    function formatQuizData(data) {
        return data.map(item => ({
            id: nanoid(),
            question: item.question,
            correct_answer: item.correct_answer,
            answers: generateAnswersArray(item.correct_answer, item.incorrect_answers),
            user_answer: ""
        }))
    }

    // The function the an array of object (oldAnswers), and toggles isCheck property of
    // the answer which name is equal to the answerID (the name of the answer clicked).
    // Also, ensures the falsity of isCheck property of the other answers.
    function updateIsCheckProperty(oldAnswers, answerID) {
        const newAnswers = []
    
        for (let answer of oldAnswers) {
            if (answer.name === answerID) {
                newAnswers.push({...answer, isCheck: !answer.isCheck})
            } else {
                newAnswers.push({...answer, isCheck: false})
            }
        }
    
        return newAnswers
    }

    // Take a quiz item where its answer was change, and return a new
    // object with the change of answer applied
    function updatedUserAnswer(quizItem, answerID) {
        const {answers} =  quizItem
        
        let newAnswers = updateIsCheckProperty(answers, answerID)
        
        let newUserAnswer = newAnswers.find(answer => answer.isCheck)
        
        // Check for the case that the user unselect its previous answer, leaving no
        // answer with the isCheck property as true
        newUserAnswer = typeof newUserAnswer === "undefined" ? "" : newUserAnswer.value
        
        return {...quizItem, answers: newAnswers, user_answer: newUserAnswer}
    }

    /********************************************************************
     **********  Open Trivia Database API Requests  
     ********************************************************************/

    // Request Categories
    useEffect(() => {
    
        updateQuiz({isLoading: true})
        
        fetch("https://opentdb.com/api_category.php")
            .then(res => res.json())
            .then(data => setQuizCategories(
            [{id: 0, name: "Any Category"}, ...data.trivia_categories]))
            .finally(updateQuiz({isLoading: false}))

    }, [])

    // Make trivia questions request
    useEffect(() => {

        if (makeAPIRequest) {

            updateQuiz({isLoading: true})

            fetch(generateURL(quiz.parameters))
                .then(res => res.json())
                .then(json => updateQuiz({data: formatQuizData(json.results)}))
                .finally(() => {
                    updateQuiz({isLoading: false, areParametersSet: true})
                    setMakeAPIRequest(false)
                })
        }

    }, [makeAPIRequest])

    /****************************************/

    return {
        quiz,
        quizCategories,
        updateQuiz,
        changeQuizParamters,
        startQuiz,
        changeQuizStatus,
        quitQuiz,
        handleParametersChange,
        changeAnswer,
        setMakeAPIRequest
    }
}

export {useQuizzical}