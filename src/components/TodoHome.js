import React, {useEffect, useState, useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import TaskFilter from './TaskFilter';
import TaskList from './TaskList';


function TodoHome({ username }) {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [filter, setFilter] = useState('all');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

    const token =localStorage.getItem('token');


    const fetchTasks = useCallback(async() => {
        try{
            const response = await fetch(`${API_BASE_URL}/todos`, {
                headers: { Authorization: `Bearer ${token}`},
                mode: 'cors'
            });
            if (!response.ok) throw new Error('タスクの取得に失敗しました')
            const data = await response.json();
            setTasks(data);
        } catch(err){
            setError(err.message);
        }
    }, [API_BASE_URL, token]);


    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);


    const handleAddTask = async (e) => {
        e.preventDefault();

        if(!title || !details){
            setError('タイトルと詳細を入力してください。');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/todos`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title, details}),
            });

            if (!response.ok) throw new Error('タスクの追加に失敗しました。');

            const newTask = await response.json();
            setTasks([...tasks, newTask]);
            setTitle('');
            setDetails('');
            setError('');
        } catch (err) {
            setError(err.message);
        }
    };{}

    const handleDeleteTask = async (taskId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/todos/${taskId}`,{
                method: 'DELETE',
                headers: {Authorization: `Bearer ${token}`},
            });
            if (!response.ok) throw new Error('タスクの削除に失敗しました。');
            setTasks(tasks.filter((task) => task.id !== taskId));
        } catch(err) {
            setError(err.message);
        }
    };

    const handleUpdateTask = async (taskId, updatedTitle, updatedDetails) => {
        try {
            const response = await fetch(`${API_BASE_URL}/todos/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({title: updatedTitle, details: updatedDetails}),
            });
            if (!response.ok) throw new Error('タスクの更新に失敗しました。')
            const updatedTask = await response.json();
            setTasks(tasks.map((task)=> (task.id === taskId ? updatedTask : task)));
        } catch (err){
            setError(err.message);
        }
    };


    const handleToggleComplete = async(taskId, completed) => {
        try {
            const response = await fetch(`${API_BASE_URL}/todos/${taskId}/toggle`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({completed: !completed}),
            });

            if (!response.ok) throw new Error('タスク状態の更新に失敗しました。');

            const updatedTask = await response.json();
            setTasks(tasks.map((task)=>(task.id === taskId ? updatedTask :task)));
        }catch (err) {
            setError(err.message);
        }
    };


    const filteredTasks = tasks.filter((task) => {
        if (filter === 'completed') return task.completed;
        if (filter === 'incomplete') return !task.completed;
        return true;
    });

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        marginTop: '20px'
    };

    const inputStyle = {
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px'
    };


    return (
        <div style={{ width: '600px', margin: '0 auto', padding: '20px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div>
                    {username}でログイン中
                </div>
                <button style={{color: 'red'}} onClick={()=>navigate('/login')}>
                    ログアウト
                </button>
            </header>

            <form style={formStyle} onSubmit={handleAddTask} >
                <input
                    type='text'
                    placeholder="タスクタイトル"
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
                <button
                    type= 'submit'
                    style={{...inputStyle, backgroundColor: '#28a745', color: 'white'}}
                >
                    タスクを追加
                </button>
            </form>

            {error && <p style={{color:'red'}}>{error}</p>}

            <TaskFilter filter={filter} setFilter={setFilter} />

            <TaskList
                tasks={filteredTasks}
                onDelete={handleDeleteTask}
                onUpdate={handleUpdateTask}
                onToggleComplete={handleToggleComplete}
            />
        </div>
    );
}

export default TodoHome;