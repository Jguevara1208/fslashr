import { useSelector, useDispatch } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import { useEffect } from 'react';

function ProfileNav() {
    const { userId } = useParams();
    const userInfo = useSelector(state => state.session.user.id)

    return (
        <>
            <nav className='profile-nav' >
                <NavLink exact to={`/users/${userId}/about`}>About</NavLink>
                <NavLink exact to={`/users/${userId}`}>Photostream</NavLink>
                <NavLink exact to={`/users/${userId}/albums`}>Albums</NavLink>
                {+userId === userInfo && (
                <>
                    <NavLink exact to={`/users/${userId}/edit`}>Edit Photos</NavLink>
                    <NavLink exact to={`/users/${userId}/favorites`}>Favorites</NavLink>
                    <NavLink exact to={`/users/${userId}/following`}>Following</NavLink>
                </>
                )}
            </nav>
        </>
    )
};

export default ProfileNav;

