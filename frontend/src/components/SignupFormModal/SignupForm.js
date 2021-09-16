import React, { useState } from "react";
import * as sessionAction from '../../store/session';
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import formModal from './SignupForm.module.css';
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
        <form className={formModal.form} onSubmit={handleSubmit}>
            {logo}
            <h3 className={formModal.welcome}> Sign up for f/r</h3>
            <label className={formModal.label}>
                First Name
                <input
                    className={formModal.input}
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
            </label>
            <label className={formModal.label}>
                Last Name
                <input
                    className={formModal.input}
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
            </label>
            <label className={formModal.label}>
                Username
                <input
                    className={formModal.input}
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </label>
            <label className={formModal.label}>
                Email
                <input
                    className={formModal.input}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </label>
            <label className={formModal.label}>
                Avatar Url
                <input
                    className={formModal.input}
                    type="text"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    required
                />
            </label>
            <label className={formModal.label}>
                Short Biography
                <input
                    className={formModal.input}
                    type="text"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    required
                />
            </label>
            <label className={formModal.label}>
                Password
                <input
                    className={formModal.input}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <button className={formModal.buttonSignup}>Sign Up</button>
        </form>
    )
}

export default SignupFormPage;
