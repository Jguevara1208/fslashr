import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { AiOutlineUser } from 'react-icons/ai'
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom'
import nav from './Navigation.module.css'

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const history = useHistory()

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);
        
        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.push('/');
    };

    return (
        <div className={nav.wrapper}>
            <button className={nav.profile} onClick={openMenu}>
                <AiOutlineUser />
            </button>
            {showMenu && (
                <div className={nav.dropdown}>
                    <NavLink className={nav.link} exact to={`/users/${user.id}`}>{user.username}</NavLink>
                    <button className={`${nav.link} ${nav.button}`} onClick={logout}>Log Out</button>
                </div>
            )}
        </div>
    );
};

export default ProfileButton