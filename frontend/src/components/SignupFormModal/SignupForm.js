import React, { useState } from "react";
import * as sessionAction from '../../store/session';
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import form from '../LoginFormModal/LoginForm.module.css'
import logo from '../LoginFormModal/modalLogo'

function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [avatarUrl, setAvatarUrl] = useState('')
    const [bio, setBio] = useState('')
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const history = useHistory()

    if (sessionUser) return (
        <Redirect to='/' />
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([])


        dispatch(sessionAction.signup({ 
            username,
            email,
            password,
            firstName,
            lastName,
            avatarUrl,
            bio
         })).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            }
        );
        history.push('/home')
    };

    return (
        <form className={form.SignUpform} onSubmit={handleSubmit}>
            {logo}
            <h3 className={form.welcome}> Sign up for f/r</h3>
            <div className={form.standardInput}>
                <input
                    className={form.input} 
                    type="text" 
                    name='firstName' 
                    placeholder=' ' 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} 
                    required 
                />
                <label className={form.label} htmlFor="firstName" >first Name</label>
                <span className={form.underline} ></span>
            </div>
            <div className={form.standardInput}>
                <input
                    className={form.input} 
                    type="text" 
                    name='lastName' 
                    placeholder=' ' 
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)} 
                    required 
                />
                <label className={form.label} htmlFor="lastName" >Last Name</label>
                <span className={form.underline} ></span>
            </div>
            <div className={form.standardInput}>
                <input
                    className={form.input} 
                    type="text" 
                    name='username' 
                    placeholder=' ' 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
                <label className={form.label} htmlFor="username" >Username</label>
                <span className={form.underline} ></span>
            </div>
            <div className={form.standardInput}>
                <input
                    className={form.input} 
                    type="email" 
                    name='email' 
                    placeholder=' ' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <label className={form.label} htmlFor="email" >Email</label>
                <span className={form.underline} ></span>
            </div>
            <div className={form.standardInput}>
                <input
                    className={form.input} 
                    type="text" 
                    name='avatarUrl' 
                    placeholder=' ' 
                    value={avatarUrl} 
                    onChange={(e) => setAvatarUrl(e.target.value)} 
                    required 
                />
                <label className={form.label} htmlFor="avatarUrl" >Avatar Url</label>
                <span className={form.underline} ></span>
            </div>
            <div className={form.standardInput}>
                <input
                    className={form.input} 
                    type="text" 
                    name='bio' 
                    placeholder=' ' 
                    value={bio} 
                    onChange={(e) => setBio(e.target.value)} 
                    required 
                />
                <label className={form.label} htmlFor="bio" >Short Biography</label>
                <span className={form.underline} ></span>
            </div>
            <div className={form.standardInput}>
                <input
                    className={form.input} 
                    type="password" 
                    name='password' 
                    placeholder=' ' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <label className={form.label} htmlFor="password" >Password</label>
                <span className={form.underline} ></span>
            </div>
            <button className={form.button}>Sign Up</button>
        </form>
    )
}

export default SignupFormPage;
