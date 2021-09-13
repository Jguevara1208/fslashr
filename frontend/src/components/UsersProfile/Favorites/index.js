import PhotoStream from "../../PhotoStream";
function Favorites({favorites}) {

    return (
        <>
            <PhotoStream photos={favorites}/>
        </>
    );
};

export default Favorites;