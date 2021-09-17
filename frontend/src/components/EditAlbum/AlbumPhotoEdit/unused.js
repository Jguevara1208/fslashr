import { useState } from 'react';

function AlbumPhotoEditUnused({ photo }) {

    const [selected, setSelected] = useState('unSelectedPhoto')

    const handleSelected = () => {
        selected === 'unSelectedPhoto' ? setSelected('selectedPhoto') : setSelected('unSelectedPhoto');
    };

    return (
        <>
            <div
                id={photo.id}
                className={selected}
                style={{ backgroundImage: `url('${photo.imgUrl}')` }}
                onClick={handleSelected}
            />
        </>
    );
};

export default AlbumPhotoEditUnused;