import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import formModal from './LoginForm.module.css'
import logo from './modalLogo'

function LoginForm() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([])
        dispatch(sessionActions.login({ credential, password })).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            }
        );
        history.push('/home')
    };

    return (
        <form className={formModal.form} onSubmit={handleSubmit}>
            {logo}
            <h3 className={formModal.welcome}>Welcome Back</h3>
            <label className={formModal.label}>
                Username or Email
                <input
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    className={formModal.input}
                    required
                />
            </label>
            <label className={formModal.label} >
                Password
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={formModal.input}
                    required
                />
            </label>
            <button className={formModal.button}>Log In</button>
        </form>
    );
}

export default LoginForm;