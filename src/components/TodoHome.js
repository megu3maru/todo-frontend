import React, {useState} from 'react';

function TodoHome({ onLogout, username }) {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [detailes, setDetailes] = useState('');
    const [error, setError] = useState('');
    const [notification, setNotification] = useState('');

    const handleAddTask = (e) => {
        e.preventDefault();

        if(title.trim().length === 0 || title.trim().lemgth > 25){
            setError('タイトルは1文字以上、25文字以内で入力してください。');
            return;
        }

        if(detailes.trim().length === 0){
            setError('詳細を入力してください。');
            return;
        }

        setError('');


        const currentDateTime = new Date().toLocaleString();

        const newTask = {
            id: Date.now(),
            title: title.trim(),
            detailes: detailes.trim(),
            createdAt: currentDateTime,
            updatedAt: currentDateTime
        };

        setTasks([...tasks, newTask]);

        setTitle('');
        setDetailes('');

        setNotification('タスクが追加されました！');
        setTimeout(()=>setNotification(''), 3000)
    };


    const handleLogout = () => {
        setTasks([]);
        onLogout();
    };


    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    };

    const buttonStyle = {
        padding: '10px',
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '5px'
    };



    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', boxSizing: 'border-box'}}>
            <header style={headerStyle}>
                <div>
                    {username}でログイン中
                </div>
                <button style={buttonStyle} onClick={handleLogout}>
                    ログアウト
                </button>
            </header>

            <form onSubmit={handleAddTask} style={{marginBottom: '20px'}}>
                <input
                    type='text'
                    placeholder="タスクタイトル（25文字以内）"
                    value={title}
                    onChange={(e)=> setTitle(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '10px',
                        marginBottom: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '5px'
                    }}
                />
                <textarea
                    placeholder= "タスク詳細"
                    value={detailes}
                    onChange={(e)=>setDetailes(e.target.value)}
                    rows="4"
                    style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '5px'
                    }}
                />

                {error && <p style={{color:'red', marginTop:'10px'}}>{error}</p>}

                <button
                    type= 'submit'
                    style={{
                        padding: '10px 20px',
                        backbroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '5px',
                        marginTop: '10px'
                    }}
                >
                    追加
                </button>
            </form>

            {notification && <p style={{color:'green', marginBottom:'20px'}}>{notification}</p>}

            <ul style={{listStyle:'none', padding:0}}>
                {tasks.map((task)=>(
                    <li
                        key={task.id}
                        style={{
                            borderBottom: '1px solid #ddd',
                            padding: '10px',
                            marginBottom: '10px',
                            borderRadius: '5px',
                            bockgroundColor: '#f8f9fa'
                        }}
                    >
                        <h3 style={{margin:'0 0 5px 0'}}>{task.title}</h3>
                        <p style={{margin: '0 0 5px 0'}}>{task.detailes}</p>
                        <small style={{display:'block', color:'#888'}}>作成日時：{task.createdAt}</small>
                        <small style={{display:'block', color:'#888'}}>更新日時：{task.updatedAt}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoHome;