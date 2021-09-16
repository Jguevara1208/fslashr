import { useState, useEffect, useRef } from 'react';
import logo from './splash-logo'
import images from './splashPhotos'
import splash from './SplashPage.module.css'
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

function SplashPage() {

    const slidePresentationTime = 7000 
    const [currentSlide, setCurrentSlide] = useState(0) 

    useEffect(() => {
        const sliderInterval = setInterval(() => {
            setCurrentSlide((currentSlide + 1) % images.length); 
        }, slidePresentationTime);

        return () => {
            clearInterval(sliderInterval)
        }
    })


    return (
        <>
            {logo}
            <div className={splash.wrapper}>
                    <LoginFormModal />
                    {images.map((image, index) => (
                        <img 
                        id={index}
                        key={index}
                        className={index === currentSlide ? `${splash.image} ${splash.active}` : splash.image}
                        src={image}
                        style={{zIndex: `-${index + 1}`}}
                        alt='splash'
                        />
                    ))}
                <div className={splash.content}>
                    <h1 className={splash.h1}>Find your inspiration</h1>
                    <p className={splash.h3}>Join the f/r community, home to an array of film photos and photographers</p>
                    <div>
                        <SignupFormModal />
                    </div>
                </div>
            </div>
        </>

    )

}
export default SplashPage