import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import './Edit.css'

function Edit({photos}) {
    return (
        <>
            {photos && photos.map(photo => (
                <div className='photo-edit-container' key={photo.id}>
                    <div className='edit-photo' style={{backgroundImage: `url('${photo.imgUrl}')`}}/>
                    <p>{photo.caption}</p>
                    <p>{photo.cameraSettings}</p>
                    <AiOutlineEdit style={{fontSize: '25px', color: 'rgba(0, 0, 0, .4)'}}/>
                    <AiOutlineDelete style={{fontSize: '25px', color: 'rgba(0, 0, 0, .4)'}}/>
                </div>
            ))}
        </>
    );
};

export default Edit;