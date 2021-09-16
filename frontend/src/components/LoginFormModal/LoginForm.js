import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import form from './LoginForm.module.css'
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
        <form className={form.form} onSubmit={handleSubmit}>
            {logo}
            <h3 className={form.welcome}>Welcome Back</h3>
            <div className={form.standardInput}>
                <input className={form.input} type="text" name='username' placeholder=' ' value={credential} onChange={(e) => setCredential(e.target.value)} required/>
                <label className={form.label} htmlFor="username" >Username</label>
                <span className={form.underline} ></span>
            </div>
            <div className={form.standardInput}>
                <input className={form.input} type="password" name='password' placeholder=' ' value={password} onChange={(e) => setPassword(e.target.value)} required />
                <label className={form.label} htmlFor="pasword" >Password</label>
                <span className={form.underline} ></span>
            </div>
            <button className={form.button} >Log In</button>
        </form>
    );
}

export default LoginForm;