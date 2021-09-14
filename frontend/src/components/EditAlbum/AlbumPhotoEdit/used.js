import { useState } from 'react';
import './AlbumPhotoEdit.css'

function AlbumPhotoEditUsed({photo}) {

    const [selected, setSelected] = useState('selected')

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
                {selected === 'unSelected' && <p>Photo will be removed from the Album</p>}
            </div>
        </>
    );
};

export default AlbumPhotoEditUsed;