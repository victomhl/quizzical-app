import React from "react";
import PropTypes from "prop-types"

function ButtonLayout(props) {
    return (
        <div className="d-flex button--container justify-content-center w-100 mt-4">
            {props.children}
        </div>
    )
}

ButtonLayout.propTypes = {
    children: PropTypes.node.isRequired
}

export default ButtonLayout