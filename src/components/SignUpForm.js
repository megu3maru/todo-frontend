import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

function SignUpForm() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!formData.username) newErrors.username = 'ユーザー名を入力してください。';
        if (!formData.email) newErrors.email = 'メールアドレスを入力してください。';
        if (!formData.password) newErrors.password = 'パスワードを入力してください。';

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            alert('アカウント作成が完了しました！（仮）');
            navigate('/login');
        }
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        margin: '0 auto',
    };

    const inputStyle = {
        padding: '10px',
        fontSize: '16px',
        width: '100%',
        boxSizing: 'border-box',
    };

    const errorStyle = {
        color: 'red',
        fontSize: '12px',
    };

    const buttonStyle = {
        padding: '10px',
        fontSize: '16px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
    };

    const linkButtonStyle = {
        padding: '10px',
        fontSize: '16px',
        backgroundColor: 'transparent',
        color: '#007bff',
        border: 'none',
        textDecoration: 'underLine',
        cursor: 'pointer',
        textAlign: 'center'
    };

    return (
        <form style={formStyle} onSubmit={handleSubmit}>
            <div>
                <input
                    type="text"
                    name="username"
                    placeholder="ユーザー名"
                    value={formData.username}
                    onChange={handleInputChange}
                    style={inputStyle}
                />
                {errors.username && <p style={errorStyle}>{errors.username}</p>}
            </div>

            <div>
                <input
                    type="email"
                    name="email"
                    placeholder="メールアドレス"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={inputStyle}
                />
                {errors.email && <p style={errorStyle}>{errors.email}</p>}
            </div>

            <div>
                <input
                    type="password"
                    name="password"
                    placeholder="パスワード"
                    value={formData.password}
                    onChange={handleInputChange}
                    style={inputStyle}
                />
                {errors.password && <p style={errorStyle}>{errors.password}</p>}
            </div>

            <button type="submit" style={buttonStyle}>
                アカウント作成
            </button>

            <button
                type="button"
                onClick={()=>navigate('/login')}
                style={linkButtonStyle}
            >
                ログイン画面に戻る
            </button>
        </form>
    );
}

export default SignUpForm;