import './AlbumPhotoAdd.css'
function AlbumPhotoAdd({photo}) {
    return (
        <>
            <div id={photo.imgUrl} className='album-add-photo' style={{backgroundImage: `url('${photo.imgUrl}')`}}/>
        </>
    );
};

export default AlbumPhotoAdd;