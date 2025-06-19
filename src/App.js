import React from 'react';
import Header from './components/Header';
import SignUpForm from './components/SignUpForm';

function App() {
    const appStyle = {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        boxSizing: 'border-box',
    };

    return (
        <div style={appStyle}>
            <Header />
            <SignUpForm />
        </div>
    );
}

export default App;