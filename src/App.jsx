import React from 'react'

import IntroPage from './components/IntroPage'
import QuizPage from './components/QuizPage'

import Buttons from './components/Buttons'
import QuizParametersForm from './components/QuizParametersForm'

import {useQuizzical} from './hooks/useQuizzical'

function App() {

    const {
        quiz,
        quizCategories,
        startQuiz,
        changeQuizStatus,
        quitQuiz,
        handleParametersChange,
        changeAnswer
    } = useQuizzical()

    function displayIntroPage() {
        return (
            <IntroPage
                quiz={quiz}
                parametersForm={
                    <QuizParametersForm
                        quiz={quiz} 
                        categories={quizCategories} 
                        handleParametersChange={handleParametersChange}
                    />
                } 
                butttonLayout={<Buttons quiz={quiz} startQuiz={startQuiz}/>}
            />
        )
    }

    function displayQuizPage() {
        return (
            <QuizPage 
                quiz={quiz}
                buttonLayout={
                    <Buttons
                        quiz={quiz}
                        quitQuiz={quitQuiz}
                        changeQuizStatus={changeQuizStatus}
                    />
                }
                changeAnswer={changeAnswer}
            />
        )
    }

    return (
        <div className="container-fluid overflow-auto">
            <div className="row justify-content-center">
                <div className='col-10 col-sm-11 col-md-8 col-lg-6 align-items-center my-4'>
                    {!quiz.areParametersSet ? displayIntroPage() : displayQuizPage()}
                </div>
            </div>
        </div>
    )
}

export default App
