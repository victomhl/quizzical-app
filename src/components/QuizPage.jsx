import React from "react";
import PropTypes from "prop-types"

function QuizzPage(props) {
    
    function setButtonSytle(isQuizzOver, correctAnswer, answer) {
        
        if (isQuizzOver) {
            if (correctAnswer === answer.value) {
                return {
                    backgroundColor: "#228B22",
                    borderColor: "#228B22",
                    color: "#000000",
                    fontWeight: "bold"
                }
            } else if (answer.isCheck) {
                return {
                    backgroundColor: "#880808",
                    borderColor: "#880808",
                    color: "#ffffff",
                    fontWeight: "bold"
                }
            } else {
                return {
                    backgroundColor: "#ffffff80",
                    borderColor: "#4D5B9E80",
                    color: "#29326480"
                }
            }
        } else {
            if (answer.isCheck) {
                return {
                    backgroundColor: "#36454F",
                    borderColor: "#36454F",
                    color: "white",
                    fontWeight: "bold"
                }
            }
        }
        
    }

    function displayAnsnwers(quizItem) {

        const {answers, id, correct_answer} = quizItem

        return answers.map(answer => {

            const styles = setButtonSytle(props.quiz.isOver, correct_answer, answer)

            return (
                <button
                    style={styles}
                    key={answer.name}
                    id={answer.name}
                    type="button"
                    className="d-flex btn btn--answer shadow-none rounded-pill"
                    onClick={(event) => props.changeAnswer(event, id)}
                    disabled={props.quiz.isOver}
                    dangerouslySetInnerHTML={{__html: answer.value}}
                >
                </button>
            )
        }) 
    }

    function displayQuiz(data) {

        return data.map(item => (
            <div key={item.id} className="mt-3">
                <h4 className="question--title mb-4" dangerouslySetInnerHTML={{__html: item.question}}></h4>
                <div className="d-flex flex-column flex-sm-column flex-md-row flex-lg-row gap-3 gap-lg-1 w-100 flex-md-wrap">
                    {displayAnsnwers(item)}
                </div>
                <hr className="my-4"/>
            </div>
        ))

    }

    function displayScore() {
        let numberOfQuestion = props.quiz.data.length
        let answerWord = props.quiz.correctAnswers > 1 ? "answers" : "answer"
        let scoreText =
            `You scored ${props.quiz.correctAnswers}/${numberOfQuestion} correct ${answerWord}`
        
        return scoreText
    }

    function displayPage() {
        return (
            <React.Fragment>
                {displayQuiz(props.quiz.data)}
                {props.quiz.isOver && <p className="score--text">{displayScore()}</p>}
                {props.buttonLayout}
            </React.Fragment>
        )
    }


    return (
        props.quiz.isLoading ? <div className="page--loading"></div> : displayPage()      
    )
}

QuizzPage.propTypes = {
    quiz: PropTypes.shape({
        areParametersSet: PropTypes.bool.isRequired,
        isOver: PropTypes.bool.isRequired,
        isLoading: PropTypes.bool.isRequired,
        parameters: PropTypes.object,
        data: PropTypes.array.isRequired,
        correctAnswers: PropTypes.number.isRequired
    }).isRequired,
    changeAnswer: PropTypes.func.isRequired,
    buttonLayout: PropTypes.element.isRequired
}

export default QuizzPage