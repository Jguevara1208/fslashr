import { useState, useEffect } from 'react';
import logo from './splash-logo'
import splashPhotoArr from './splashPhotos'
import splash from './SplashPage.module.css'
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

function SplashPage() {
    const length = splashPhotoArr.length;
    const [currentPhoto, setCurrentPhoto] = useState(0);
    const [nextPhoto, setNextPhoto] = useState(1)

    const nextPhotoInArr = () => {
        setCurrentPhoto(currentPhoto === length - 1 ? 0 : currentPhoto + 1)
        setNextPhoto(nextPhoto === length - 1 ? 0 : nextPhoto + 1)
    };

    const setClassName = (i) => {
        if (i === currentPhoto) return splash.photo
        if (i ===nextPhoto) return splash.nextPhoto
        return splash.restOfPhotos
    }

    useEffect(() => {
        setTimeout(nextPhotoInArr, 6000);
    });


    return (
        <>
            {logo}
            <div className={splash.wrapper}>
                    <LoginFormModal />
                    {splashPhotoArr.map((photo, i) => (
                        <div 
                            className={setClassName(i)}
                            key={photo.id}
                            style={{backgroundImage: `url('${photo}')`}}
                        />
                    ))}
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