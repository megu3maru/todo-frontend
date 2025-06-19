import React from 'react';

function ToDoList() {
    const dummyTasks = [
        { title: 'タスク1', details: 'これはサンプルタスクです。', createdAt: '2024-12-12' },
        { title: 'タスク2', details: 'もう1つのサンプルタスクです。', createdAt: '2024-12-11' },
    ];

    const listStyle = {
        listStyle: 'none',
        padding: 0,
        width: '100%',
        maxWidth: '600px',
        margin: '20px auto',
    };

    const itemStyle = {
        padding: '20px',
        borderBottom: '1px solid #ddd',
        backgroundColor: '#fff',
        marginBottom: '10px',
        borderRadius: '5px',
    };

    const titleStyle = {
        fontWeight: 'bold',
        marginBottom: '5px',
    };

    const dateStyle = {
        fontSize: '12px',
        color: '#888',
    };

    return (
        <ul style={listStyle}>
            {dummyTasks.map((task, index) => (
                <li key={index} style={itemStyle}>
                    <h3 style={titleStyle}>{task.title}</h3>
                    <p>{task.details}</p>
                    <p style={dateStyle}>作成日: {task.createdAt}</p>
                </li>
            ))}
        </ul>
    );
}

export default ToDoList;
