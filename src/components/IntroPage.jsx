import React from "react"
import PropTypes from "prop-types"

function IntroPage(props) {
    return (
        <React.Fragment>
            <div className='header'>
                <h1 className='header--title'>Quizzical</h1>
                <p className='header--description mt-2'>
                    Put yourself on a test
                </p>
            </div>
            {props.parametersForm}
            {props.butttonLayout}
        </React.Fragment>
    )
}

IntroPage.propTypes = {
    parametersForm: PropTypes.element.isRequired,
    butttonLayout: PropTypes.element.isRequired
}

export default IntroPage