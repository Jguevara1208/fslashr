import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getInfoThunk} from '../../../store/userInfo';
import { useParams, Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai'
import AlbumDelete from './AlbumDelete';
import albums from './Albums.module.css'
// import link from '../../Navigation/Navigation.module.css'

function Album() {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const currentUserAlbums = useSelector(state => state.currentUser.albums)
    const currentUser = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getInfoThunk(userId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <>
            <p style={{ textAlign: 'center', color: 'rgba(0, 0, 0, .5)', fontSize: '18px', fontWeight: '200', marginBottom: '0px', marginTop: '30px' }}>Albums</p>
            <div className={albums.container}>
                {currentUserAlbums.length > 0 
                ? 
                    <div className={albums.wrapper}>
                        {currentUserAlbums.map( album => (
                            <div className={albums.card} key={album.id}>
                                <p style={{ textAlign: 'center', color: 'rgba(0, 0, 0, .5)', fontSize: '18px', fontWeight: '200', marginBottom: '8px', marginTop: '0px' }}>{album.title}</p>
                                <Link to={`/albums/${album.id}`}>
                                    <div className={albums.photo} style={{backgroundImage: `url('${album.Photos[0].imgUrl}')`}} />
                                </Link>
                                <div className={albums.content}>
                                        <div className={albums.info}>
                                            <p>{album.Photos.length} photos</p>
                                        </div>
                                    {+userId === currentUser?.id && (
                                        <div className={albums.buttons}>
                                            <AlbumDelete albumId={album.id} />
                                            <Link className={albums.edit} to={`/albums/${album.id}/edit`}><AiOutlineEdit/></Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                :
                    <p style={{ textAlign: 'center', color: 'rgba(0, 0, 0, .5)', fontSize: '18px', fontWeight: '200', marginBottom: '0px', marginTop: '30px' }}>This user doesn't have any albums...</p>
                }
                {+userId === currentUser?.id && (
                    <Link className={albums.link} to='/albums/new'>New Album</Link>
                )}
            </div>
        </>
    );
};

export default Album;