import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineCloudUpload } from 'react-icons/ai';
import NavLogo from './navbar-logo'
import ProfileButton from "./ProfileButton";
import nav from './Navigation.module.css';

function Navigation( {isLoaded} ) {
    const sessionUser = useSelector(state => state.session.user);
    
    return (
        <nav className={nav.main}>
            <div className={nav.container}>
                <NavLink exact to='/home'>{NavLogo}</NavLink>
                {isLoaded && (
                    <div className={nav.buttons}>
                        <NavLink className={nav.upload} to='/images/upload'><AiOutlineCloudUpload style={{fontSize: '2.2em'}} /></NavLink>
                        <ProfileButton user={sessionUser} />
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navigation;