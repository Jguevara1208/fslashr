import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getInfoThunk} from '../../../store/userInfo';
import { useParams, Link, Route} from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai'
import AlbumDelete from './AlbumDelete';
import './Albums.css'

function Album() {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const currentUserAlbums = useSelector(state => state.currentUser.albums)

    useEffect(() => {
        dispatch(getInfoThunk(userId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <>
            <Link to='/albums/new'>Create a new Album</Link>
            <div className='albums-container'>
                {currentUserAlbums && currentUserAlbums.map( album => (
                    <div className='album-card' key={album.id}>
                        <Link to={`/albums/${album.id}`}>
                            <div className='album-photo' style={{backgroundImage: `url('${album.Photos[0].imgUrl}')`}} />
                        </Link>
                        <p>{album.title}</p>
                        <p>{album.Photos.length} photos</p>
                        <AlbumDelete albumId={album.id} />
                        <Link to={`/albums/${album.id}/edit`}><AiOutlineEdit/></Link>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Album;