import React, {Component} from 'react';

const Nav = props => {
    return (
    <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <p style={{float: "right"}} className="user-count">{props.usersOnline} users online</p>
    </nav>);
}

module.exports = Nav;