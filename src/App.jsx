import React from 'react'

import IntroPage from './components/IntroPage'
import QuizPage from './components/QuizPage'

import Button from './components/Button'
import ButtonLayout from './components/ButtonLayout'
import QuizParametersForm from './components/QuizParametersForm'

import {useQuizzical} from './hooks/useQuizzical'

function App() {

    const {
        quiz,
        quizCategories,
        responseCode,
        startQuiz,
        changeQuizStatus,
        quitQuiz,
        handleParametersChange,
        changeAnswer
    } = useQuizzical()

    function displayIntroPage() {

        // 0 and null (initial value) are falsy values
        const buttonText = !responseCode ? "Start Quiz" : "Try Again"

        return (
            <IntroPage
                quiz={quiz}
                responseCode={responseCode}
                parametersForm={
                    <QuizParametersForm
                        quiz={quiz} 
                        categories={quizCategories} 
                        handleParametersChange={handleParametersChange}
                    />
                }
                butttonLayout={
                    <ButtonLayout>
                        <Button handleOnClick={startQuiz} disabled={quiz.isLoading}>
                            {
                                quiz.isLoading
                                ? 
                                <div className="loading--symbol"></div> : buttonText
                            }
                        </Button>
                    </ButtonLayout> 
                }
            />
        )
    }

    function displayQuizPage() {
        return (
            <QuizPage 
                quiz={quiz}
                changeAnswer={changeAnswer}
                buttonLayout={
                    <ButtonLayout>
                        <React.Fragment>
                            <Button handleOnClick={changeQuizStatus} disabled={false}>
                                {quiz.isOver ? "Play Again" : "Check answers"}
                            </Button>
                            {
                                quiz.isOver
                                &&
                                <Button handleOnClick={quitQuiz} disabled={false}>
                                    {"Back"}
                                </Button>
                            }
                        </React.Fragment>
                    </ButtonLayout>
                }
            />
        )
    }

    return (
        <div className="container-fluid overflow-auto">
            <div className="row justify-content-center">
                <div className='col-10 col-sm-11 col-md-8 col-lg-6 align-items-center my-4'>
                    {responseCode !== 0 ? displayIntroPage() : displayQuizPage()}
                </div>
            </div>
        </div>
    )
}

export default App
