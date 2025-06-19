import React from 'react';

function Header() {
    const headerStyle = {
        textAlign: 'center',
        margin: '20px 0',
    };

    const titleStyle = {
        color: '#333',
        fontSize: '2.5rem',
    };

    return (
        <header style={headerStyle}>
            <h1 style={titleStyle}>My ToDo App</h1>
        </header>
    );
}

export default Header;
