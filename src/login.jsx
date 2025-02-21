import React, { useState } from 'react';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/auth/login', { // Your Lambda endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                setMessage('Login successful!');
                // Redirect or update state as needed
            } else {
                const errorData = await response.text(); // Get error message from backend
                setMessage(errorData || 'Login failed');
            }
        } catch (error) {
            setMessage('Error: ' + error.message);
        }
    };

    const handleGet = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://c867e8gelg.execute-api.us-east-1.amazonaws.com/dev', { // Your Lambda endpoint
                method: 'GET',
               headers:{
                'x-api-key': 'kb04MVz4gP9ssus1cCjqq1k19XgfPJI66IAScLQg'
               }
            });

            if (response.ok) {
                setMessage(response.ok);
                console.log(response.ok)
                // Redirect or update state as needed
            } else {
                const errorData = await response.text(); // Get error message from backend
                setMessage(errorData || 'Login failed');
            }
        } catch (error) {
            setMessage('Error: ' + error.message);
        }
    };

    return (
        <>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Log in</button>
            {message && <p>{message}</p>}
        </form>
        <form onSubmit={handleGet}>
        <button type="submit">fetch</button>
        {message && <p>{message}</p>}
    </form>
    </>
    );
}

export default LoginForm;