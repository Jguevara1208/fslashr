import logo from './splash-logo'
import splashPhotoArr from './splashPhotos'
import './SplashPage.css'
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

function SplashPage() {

    return (
        <div className='wrapper'>
            {logo}
            <LoginFormModal />
            <div className='splash__photo' style={{backgroundImage: `url('${splashPhotoArr[0]}')`}}/>
            <h1>Find your inspiration</h1>
            <h3>Join the f/r community, home to an array of film photos and photographers</h3>
            <SignupFormModal />
        </div>

    )

}
export default SplashPage