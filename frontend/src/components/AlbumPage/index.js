import './AlbumPage.css'
import PhotoStream from '../PhotoStream';
import { getAlbum } from '../../store/album';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';


function AlbumPage() {
    const { albumId } = useParams()
    const dispatch = useDispatch()
    const album = useSelector(state => state.album.album)

    useEffect(() => {
        dispatch(getAlbum(albumId))
    },[albumId, dispatch])


    return (
        <>
            {album && (
                <div>
                    <div className='album-banner' style={{backgroundImage: `url('${album[0].imgUrl}')`}}>
                        <p>{album.title}</p>
                    </div>
                    <PhotoStream photos={album} />
                </div>
            )}
        </>
    );
};

export default AlbumPage;