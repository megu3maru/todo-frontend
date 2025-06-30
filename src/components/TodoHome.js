import React, {useState} from 'react';
import TaskFilter from './TaskFilter';
import TaskList from './TaskList';


function TodoHome({ onLogout, username }) {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [filter, setFilter] = useState('all');
    const [error, setError] = useState('');
    const [notification, setNotification] = useState('');

    const handleAddTask = (e) => {
        e.preventDefault();

        if(title.trim().length === 0 || title.trim().length > 25){
            setError('タイトルは1文字以上、25文字以内で入力してください。');
            return;
        }

        if(!title || !details){
            setError('タイトルと詳細を入力してください。');
            return;
        }

        setError('');


        const currentDateTime = new Date().toLocaleString();

        const newTask = {
            id: Date.now(),
            title: title.trim(),
            details: details.trim(),
            createdAt: currentDateTime,
            updatedAt: currentDateTime,
            completed: false
        };

        setTasks([...tasks, newTask]);

        setTitle('');
        setDetails('');

        setNotification('タスクが追加されました！');
        setTimeout(()=>setNotification(''), 3000)
    };


    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter((task) =>  task.id !== taskId));
    };


    const handleUpdateTask = (taskId, updatedTitle, updatedDetails) => {
        setTasks(
            tasks.map((task) =>
                task.id === taskId
                    ?{
                        ...task,
                        title: updatedTitle,
                        details: updatedDetails,
                        updatedAt: new Date().toLocaleString()
                    }
                    : task
            )
        );
    };


    const handleToggleComplete = (taskId) => {
        setTasks(
            tasks.map((task) =>
                task.id === taskId
                    ? {...task, completed: !task.completed, updatedAt: new Date().toLocaleString()}
                    : task
            )
        );
    };


    const filteredTasks = tasks.filter((task) =>{
        if (filter === 'completed') return task.completed;
        if (filter === 'incomplete') return !task.completed;
        return true;
    });


    const handleLogout = () => {
        setTasks([]);
        onLogout();
    };


    const containerStyle = {
        width: '600px',
        margin: '0 auto',
        padding: '20px'
    }

    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        marginTop: '20px'
    }

    const inputStyle = {
        padding: '10px',
        fontSize: '16px',
        width: '100%',
        boxSizing: 'border-box'
    }

    const errorStyle = {
        color: 'red',
        fontSize: '14px'
    }

    const loggoutButtonStyle = {
        padding: '10px',
        fontSize: '16px',
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
    };



    return (
        <div style={containerStyle}>
            <header style={headerStyle}>
                <div>
                    {username}でログイン中
                </div>
                <button style={loggoutButtonStyle} onClick={onLogout}>
                    ログアウト
                </button>
            </header>

            <form style={formStyle} onSubmit={handleAddTask} >
                <input
                    type='text'
                    placeholder="タスクタイトル（25文字以内）"
                    value={title}
                    onChange={(e)=> setTitle(e.target.value)}
                    style={inputStyle}
                />
                <textarea
                    placeholder= "タスク詳細"
                    value={details}
                    onChange={(e)=>setDetails(e.target.value)}
                    style={{...inputStyle, height:'120px'}}
                />

                {error && <p style={errorStyle}>{error}</p>}

                <button
                    type= 'submit'
                    style={{
                        padding: '10px',
                        fontSize: '16px',
                        backbroundColor: '#28a745',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    追加
                </button>
            </form>

            {notification && <p style={{color:'green', marginBottom:'20px'}}>{notification}</p>}

            <TaskFilter filter={filter} setFilter={setFilter} />

            <TaskList tasks={filteredTasks} onDelete={handleDeleteTask} onUpdate={handleUpdateTask} onToggleComplete={handleToggleComplete} />
        </div>
    );
}

export default TodoHome;