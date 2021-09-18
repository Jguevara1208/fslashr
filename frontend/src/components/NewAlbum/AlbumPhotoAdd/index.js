import { useState } from 'react';
import './AlbumPhotoAdd.css'

function AlbumPhotoAdd({photo, used}) {

    const [selected, setSelected] = useState('unSelectedPhoto')

    const handleSelected = () => {
        selected === 'unSelectedPhoto' ? setSelected('selectedPhoto') : setSelected('unSelectedPhoto')
    }

    return (
        <>
            <div 
                id={photo.id} 
                className={selected} 
                style={{backgroundImage: `url('${photo.imgUrl}')`}}
                onClick={handleSelected}
            />
        </>
    );
};

export default AlbumPhotoAdd;