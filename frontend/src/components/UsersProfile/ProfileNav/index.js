import { useSelector } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import pNav from './ProfileNav.module.css';
import link from '../../Navigation/Navigation.module.css';

function ProfileNav() {
    const { userId } = useParams();
    const userInfo = useSelector(state => state.session.user.id)

    const [isSticky, setSticky] = useState(false);

    useEffect(() => {
        const element = document.querySelector(`.${pNav.nav}`)
        const handleScroll = () => {
            window.scrollY  - 190 >= element.getBoundingClientRect().bottom
                ? setSticky(true)
                : setSticky(false);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <>
            <nav className={isSticky ? `${pNav.nav} ${pNav.sticky}` : pNav.nav} >
                <div className={pNav.wrapper}>
                    <NavLink activeClassName={link.active} className={`${link.link} ${pNav.about}`} exact to={`/users/${userId}/about`}>About</NavLink>
                    <NavLink activeClassName={link.active} className={`${link.link} ${pNav.photostream}`} exact to={`/users/${userId}`}><span> Photostream</span></NavLink>
                    <NavLink activeClassName={link.active} className={`${link.link} ${pNav.albums}`} exact to={`/users/${userId}/albums`}>Albums</NavLink>
                    {+userId === userInfo && (
                    <>
                        <NavLink activeClassName={link.active} className={`${link.link} ${pNav.edit}`} exact to={`/users/${userId}/edit`}><span>Edit Photos</span></NavLink>
                        <NavLink activeClassName={link.active} className={`${link.link} ${pNav.favorites}`} exact to={`/users/${userId}/favorites`}><span>Favorites</span></NavLink>
                    </>
                    )}
                </div>
            </nav>
        </>
    )
};

export default ProfileNav;

