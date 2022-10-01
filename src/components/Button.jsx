import React from "react";
import PropTypes from "prop-types"

function Button(props) {

    return (
        <button
            type="button"
            className="button btn btn-lg shadow-none"
            onClick={props.handleOnClick}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    )
}

Button.propTypes = {
    handleOnClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired
}

export default Button