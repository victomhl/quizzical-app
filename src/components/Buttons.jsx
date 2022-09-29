import React from "react";
import PropTypes from "prop-types"

function Buttons(props) {

    const BUTTON_CLASS = "button btn btn-lg shadow-none"

    function displayIntroPageButton() {
        return (
            <button
                type='button'
                className={BUTTON_CLASS}
                onClick={props.startQuiz}
                disabled={props.quiz.isLoading}
            >
                {props.quiz.isLoading? <div className="loading--symbol"></div> : "Start Quizz"}
            </button>
        )
    }

    function displayQuizPageButton() {
        return (
            <React.Fragment>
                <button
                    type="button" 
                    className={BUTTON_CLASS}
                    onClick={props.changeQuizStatus}
                >
                    {props.quiz.isOver ? "Play Again" : "Check answers"}
                </button>

                {
                    props.quiz.isOver
                    &&
                    <button 
                        type="button"
                        className={BUTTON_CLASS}
                        onClick={props.quitQuiz}
                    >
                        Back
                    </button>
                }
            </React.Fragment>
        )
    }

    return (
        <div className="d-flex button--container justify-content-center w-100 mt-4">
            {!props.quiz.areParametersSet ? displayIntroPageButton() : displayQuizPageButton()}
        </div>
    )
}

Buttons.propTypes = {
    quiz: PropTypes.shape({
        areParametersSet: PropTypes.bool.isRequired,
        isOver: PropTypes.bool.isRequired,
        isLoading: PropTypes.bool.isRequired,
        parameters: PropTypes.object,
        data: PropTypes.array,
        correctAnswers: PropTypes.number
    }).isRequired,
    startQuiz: PropTypes.func,
    changeQuizStatus: PropTypes.func,
    quitQuiz: PropTypes.func
}

export default Buttons