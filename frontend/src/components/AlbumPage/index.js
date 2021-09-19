import PhotoStream from '../PhotoStream';
import { getAlbum } from '../../store/album';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { BiArrowBack } from 'react-icons/bi'; 
import albumForm from '../NewAlbum/NewAlbum.module.css';
import albumPage from './AlbumPage.module.css'


function AlbumPage() {

    const history = useHistory();
    const { albumId } = useParams();
    const dispatch = useDispatch();
    const firstImage = useSelector(state => state?.album?.banner);
    const album = useSelector(state => state?.album?.album);

    useEffect(() => {
        dispatch(getAlbum(albumId));
    },[dispatch]);


    return (
        <div className={albumPage.wrapper}>
            <div className={albumForm.goBack}>
                <p onClick={() => history.goBack()}> <BiArrowBack /> back to albums</p>
            </div>
            {album && (
                <div className={albumPage.container}>  
                    <div className={albumPage.banner} style={{backgroundImage: `url('${firstImage?.imgUrl}')`}}>
                        <p className={albumPage.title}>{firstImage?.Album?.title}</p>
                    </div>
                    <PhotoStream photos={album} />
                </div>
            )}
        </div>
    );
};

export default AlbumPage;