import Photo from './Photo';
import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllImages } from '../../../store/userInfo'
import edit from './Edit.module.css'

function Edit() {
    const dispatch = useDispatch();

    const sessionPhotos = useSelector(state => state.currentUser.photos);
    const userId = useSelector(state=> state.session?.user?.id);


    useEffect(() => {
        dispatch(getAllImages(userId));
    }, [dispatch, userId])

    return (
        <div className={edit.wrapper}>
            <p style={{ textAlign: 'center', color: 'rgba(0, 0, 0, .5)', fontSize: '18px', fontWeight: '200', marginBottom: '0px', marginTop: '30px' }}>Edit Photos</p>
            <p className={edit.directions}>Click the text of any photo to open an input to edit it.</p>
            <div className={edit.container}>
                {sessionPhotos && sessionPhotos.map(photo => (
                    <Photo photo={photo} key={photo.id}/>
                    ))}
            </div>
        </div>
    );
};

export default Edit;