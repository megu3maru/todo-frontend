import React from 'react';

function ToDoForm() {
    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '15px',
        width: '100%',
        maxWidth: '600px',
        margin: '20px auto',
    };

    const inputStyle = {
        padding: '10px',
        fontSize: '16px',
        width: '100%',
        boxSizing: 'border-box',
    };

    const buttonStyle = {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        maxWidth: '150px',
    };

    return (
        <form style={formStyle}>
            <input
                type="text"
                placeholder="タスクタイトル"
                style={inputStyle}
                disabled
            />
            <textarea
                placeholder="タスク詳細"
                style={{ ...inputStyle, height: '120px', resize: 'vertical' }}
                disabled
            />
            <button type="button" style={buttonStyle} disabled>
                追加
            </button>
        </form>
    );
}

export default ToDoForm;
