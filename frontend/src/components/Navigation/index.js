import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { BiSearchAlt2 } from 'react-icons/bi';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import NavLogo from './navbar-logo'
import ProfileButton from "./ProfileButton";
import './Navigation.css';

function Navigation( {isLoaded} ) {
    const sessionUser = useSelector(state => state.session.user);
    
    return (
        <nav>
            <NavLink exact to='/home'>{NavLogo}</NavLink>
            {isLoaded && (
                <>
                    <NavLink to='/upload'><AiOutlineCloudUpload style={{fontSize: '2.2em'}} /></NavLink>
                    <ProfileButton user={sessionUser} />
                </>
            )}
        </nav>
    );
}

export default Navigation;