import stream from './PhotoStream.module.css';
import { Link } from 'react-router-dom';


function PhotoStream({photos}) {

    return (
        <>
            <div className={stream.container}>
                <ul className={stream.wrapper}>
                    {photos && photos.map((photo) => (
                        <div className={stream.test}>
                            <p className={`${stream.options} ${stream.caption}`}>{photo.cameraSettings}</p>
                            <p className={`${stream.options} ${stream.username}`}>{photo.caption}</p>
                            <li key={photo.id} className={stream.photo}>   
                                <Link to={`/images/${photo.id}`}>
                                    <img className={stream.photoStream} src={`${photo.imgUrl}`} alt="asdasd"/>
                                </Link>
                            </li>
                        </div>
                    ))}
                    <li className={stream.photo}></li>
                </ul>
            </div>
        </>
    );
};

export default PhotoStream;