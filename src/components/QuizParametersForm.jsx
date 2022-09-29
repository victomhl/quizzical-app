import React from "react";
import PropTypes from "prop-types"

function QuizParametersForm(props) {

    // Map each category in the categories array and return a new
    // option html elements array
    const categoriesElements = props.categories.map(category => {
        return (<option 
                    key={category.id}
                    value={`${category.id}`}
                >
                {`${category.name}`}
                </option>)
    })

    return (
        <React.Fragment>
            <fieldset>
                <label htmlFor="amount">Number of Questions:</label>
                <input 
                    type="number"
                    className="w-100 shadow-none"
                    name="amount"
                    value={props.quiz.parameters.amount}
                    onChange={props.handleParametersChange}
                    max="20"
                    min="5"
                    disabled={props.quiz.isLoading}
                />
            </fieldset>

            <fieldset>
                <label htmlFor="category">Select Category:</label>
                <select 
                    className="form-select"
                    name="category"
                    value={props.quiz.parameters.category}
                    onChange={props.handleParametersChange}
                    disabled={props.quiz.isLoading}
                >
                    {categoriesElements}
                </select>
            </fieldset>

            <fieldset>
                <label htmlFor="difficulty">Select Difficulty:</label>
                <select 
                    className="form-select"
                    name="difficulty"
                    value={props.quiz.parameters.difficulty}
                    onChange={props.handleParametersChange}
                    disabled={props.quiz.isLoading}
                >
                    <option value="any">Any Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </fieldset>

            <fieldset>
                <label htmlFor="type">Select Type:</label>
                <select 
                    className="form-select"
                    name="type"
                    value={props.quiz.parameters.type}
                    onChange={props.handleParametersChange}
                    disabled={props.quiz.isLoading}
                >
                    <option value="any">Any Type</option>
                    <option value="multiple">Multiple Choice</option>
                    <option value="boolean">True / False</option>
                </select>
            </fieldset>
        </React.Fragment>
    )
}

QuizParametersForm.propTypes = {
    quiz: PropTypes.shape({
        areParametersSet: PropTypes.bool.isRequired,
        isOver: PropTypes.bool,
        isLoading: PropTypes.bool,
        parameters: PropTypes.shape({
            amount: PropTypes.string.isRequired,
            category: PropTypes.string.isRequired,
            difficulty: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired
        }).isRequired,
        data: PropTypes.array,
        correctAnswers: PropTypes.number
    }).isRequired,
    categories: PropTypes.array.isRequired,
    handleParametersChange: PropTypes.func.isRequired
}

export default QuizParametersForm;