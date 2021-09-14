import { useState } from 'react';
import './AlbumPhotoEdit.css'

function AlbumPhotoEditUnused({ photo }) {

    const [selected, setSelected] = useState('unSelected')

    const handleSelected = () => {
        selected === 'unSelected' ? setSelected('selected') : setSelected('unSelected');
    };

    return (
        <>
            <div
                id={photo.id}
                className={selected}
                style={{ backgroundImage: `url('${photo.imgUrl}')` }}
                onClick={handleSelected}
            >
                {selected === 'selected' && <p>Photo will be added to Album</p>}
            </div>
        </>
    );
};

export default AlbumPhotoEditUnused;