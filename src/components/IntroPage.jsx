import React from "react"
import PropTypes from "prop-types"

function IntroPage(props) {
    
    const descriptionText = (
        props.responseCode === 1
        ?
        "Sorry, not enough question in our database. Please try again" : "Put yourself on a test"
    )

    return (
        <React.Fragment>
            <div className='header'>
                <h1 className='header--title'>Quizzical</h1>
                <p className='header--description mt-2'>
                    {descriptionText}
                </p>
            </div>
            {/* Zero and null are falsy values */}
            {!props.responseCode && props.parametersForm}
            {props.butttonLayout}
        </React.Fragment>
    )
}

IntroPage.propTypes = {
    parametersForm: PropTypes.element.isRequired,
    butttonLayout: PropTypes.element.isRequired
}

export default IntroPage