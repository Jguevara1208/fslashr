import { useState } from 'react';

function AlbumPhotoEditUsed({photo}) {

    const [selected, setSelected] = useState('selectedPhoto')

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

export default AlbumPhotoEditUsed;