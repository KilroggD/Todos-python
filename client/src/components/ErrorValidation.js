import React from 'react'

/**
 * Validation Errors List
 * @param {object} props 
 */

const ErrorValidation = (props) => {
    return <div className="ut__badge ut__badge--error">
        <ul className="ut__list">
            {
                Object.keys(props.errors).map((key) => {
                    return props.errors[key].map((error, index) => {
                        return <li key={index}>{`${key} - ${error}`}</li>
                    })
                })
            }
        </ul>
    </div>
}

export default ErrorValidation;
