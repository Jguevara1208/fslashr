import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getInfoThunk} from '../../../store/userInfo';
import { useParams } from 'react-router-dom';

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
            <div className='albums-container'>
                {currentUserAlbums && currentUserAlbums.map( album => (
                    <div className='album-card' key={album.id}>
                        <div className='album-photo' style={{backgroundImage: `url('${album.Photos[0].imgUrl}')`}} />
                        <p>{album.title}</p>
                        <p>{album.Photos.length} photos</p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Album;