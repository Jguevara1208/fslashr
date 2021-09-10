import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { BiSearchAlt2 } from 'react-icons/bi';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import ProfileButton from "./ProfileButton";
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

function Navigation( {isLoaded} ) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;

    if (sessionUser) {
        sessionLinks = (
            <>
                <BiSearchAlt2 />
                <NavLink to='/upload'><AiOutlineCloudUpload /></NavLink>
                <ProfileButton user={sessionUser}/>
            </>
        );
    } else {
        sessionLinks = (
            <>
                <LoginFormModal />
                <SignupFormModal />
            </>
        )
    }
    
    return (
        <nav>
            <NavLink exact to='/'>Home</NavLink>
            {isLoaded && sessionLinks}
        </nav>
    );
}

export default Navigation;