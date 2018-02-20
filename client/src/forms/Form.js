import React from 'react'

const Form = (props) => {
    return (
        <form className="ut__form" onSubmit={props.onSubmit}>
            <h2>{props.title}</h2>
            {props.children}
            <button type="submit" className="ut__button ut__button--fullsize">{props.button}</button>
        </form>
    );
}

export default Form
