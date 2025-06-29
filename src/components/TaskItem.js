import React from "react";


function TaskItem({task, onToggleComplete}) {

    const itemStyle = {
        padding: '15px',
        borderBottom: '1px solid #ddd',
        marginBottom: '10px',
        cursor: 'pointer'
    };

    const textStyle = {
        whiteSpace: 'pre-wrap',
        textDecoration: task.completed ? 'line-through' : 'none' ,
        color: task.completed ? '#28a745' : '#000'
    };


    return(
        <li style={itemStyle} onClick={()=>onToggleComplete(task.id)}>
            <h3 style={textStyle}>{task.title}</h3>
            <p style={textStyle}>{task.detailes}</p>
            <small>作成日時：{task.createdAt}</small>
            <br />
            <small>更新日時：{task.updatedAt}</small>
        </li>
    );
}


export default TaskItem;