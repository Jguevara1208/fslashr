import React, { useEffect, useState } from 'react'
import { BiUpArrowCircle } from 'react-icons/bi'
import top from './ScrollToTop.module.css'

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () =>
            window.pageYOffset > 500 ? setIsVisible(true) : setIsVisible(false)

        window.addEventListener('scroll', toggleVisibility)
        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    return isVisible ? (
        <div className={top.scrollTop}>
            <a href='#top'>
                <BiUpArrowCircle className={top.arrow} />
            </a>
        </div>
    ) : null
}

export default ScrollToTop