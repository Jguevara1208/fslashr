import React, { useState, useRef } from "react";
import * as sessionAction from '../../store/session';
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
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

    const fileUpload = useRef(null)
    const imageRef = useRef()

    const history = useHistory()

    if (sessionUser) return (
        <Redirect to='/' />
    );

    const handleUpload = () => {
        fileUpload.current.click()
    }

    const setPhoto = (e) => {
        const file = e.target.files[0]
        setAvatarUrl(file)
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            imageRef.current.src = reader.result
        }
    }

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
        history.push('/')
    };

    const demoUser = () => {
        dispatch(sessionActions.login({
            credential: 'DemoUser123',
            password: 'Password1!'
        }));
        history.push('/')
    }

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
            {avatarUrl && <img className={form.uploadAvatar} ref={imageRef} src="" alt="" />}
            <div>
                <input type='file' className={form.inputfile} ref={fileUpload} onChange={setPhoto} />
                <div className={form.fileChooser} onClick={() => handleUpload()} >Choose Photo</div>
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
            <p className={form.demo} onClick={demoUser}>Demo User</p>
        </form>
    )
}

export default SignupFormPage;
