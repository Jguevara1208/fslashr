import { useSelector } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import pNav from './ProfileNav.module.css';
import link from '../../Navigation/Navigation.module.css';

function ProfileNav() {
    const { userId } = useParams();
    const userInfo = useSelector(state => state.session.user.id)

    return (
        <>
            <nav className={`${pNav.nav} ${pNav.true}`} >
                <div className={pNav.wrapper}>
                    <NavLink activeClassName={link.active} className={link.link} exact to={`/users/${userId}/about`}>About</NavLink>
                    <NavLink activeClassName={link.active} className={link.link} exact to={`/users/${userId}`}>Photostream</NavLink>
                    <NavLink activeClassName={link.active} className={link.link} exact to={`/users/${userId}/albums`}>Albums</NavLink>
                    {+userId === userInfo && (
                    <>
                        <NavLink activeClassName={link.active} className={link.link} exact to={`/users/${userId}/edit`}>Edit Photos</NavLink>
                        <NavLink activeClassName={link.active} className={link.link} exact to={`/users/${userId}/favorites`}>Favorites</NavLink>
                    </>
                    )}
                </div>
            </nav>
        </>
    )
};

export default ProfileNav;

