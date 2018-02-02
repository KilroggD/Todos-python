import React from 'react'

/**
 * Header with greetings and links
 * @param {object} props 
 */

const Header = (props) => {
    return <header className="header">
        <p className="header__greeting">
            <span>
                Welcome
                <a className="header__link" href="">
                    {props.current_user.first_name}
                </a>
            </span>
        </p>
        <p className="header__logout">
            <a className="header__link" href="" onClick={(e) => { e.preventDefault(); props.logout(); }}>
                Logout
            </a>
        </p>
    </header>
}

export default Header
