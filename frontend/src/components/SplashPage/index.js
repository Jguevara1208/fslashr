import logo from './splash-logo'
import splashPhotoArr from './splashPhotos'
import splash from './SplashPage.module.css'
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

function SplashPage() {

    return (
        <>
            {logo}
            <div className={splash.wrapper}>
                    <LoginFormModal />
                <div className={splash.photo} style={{backgroundImage: `url('${splashPhotoArr[0]}')`}}/>
                <div className={splash.content}>
                    <h1 className={splash.h1}>Find your inspiration</h1>
                    <p className={splash.h3}>Join the f/r community, home to an array of film photos and photographers</p>
                    <SignupFormModal />
                </div>
            </div>
        </>

    )

}
export default SplashPage