import './PhotoStream.css';
import { Link, useParams } from 'react-router-dom';
import { BiComment, BiPhotoAlbum } from 'react-icons/bi'


function PhotoStream({photos}) {
    const { userId } = useParams()

    return (
        <>
            <div className='container__photos'>
                {photos && photos.map((photo) => (
                    <div key={photo.id}>
                        <Link to={`/images/${photo.id}`}>
                            <div
                                className='photoStream'
                                key={photo.id}
                                style={{ backgroundImage: `url('${photo.imgUrl}')` }}
                            >
                            </div>
                            <div className='photo-options'>
                                <p>{photo.caption}</p>
                                {userId !== photo.userId && (
                                    <BiPhotoAlbum style={{ fontSize: '25', color: 'black' }}/>
                                )}
                                <BiComment style={{ fontSize: '25', color: 'black' }} />
                                <p>shot by: {photo.User.username}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
};

export default PhotoStream;