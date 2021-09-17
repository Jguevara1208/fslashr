import PhotoStream from "../../PhotoStream";
function Favorites({favorites}) {

    return (
        <>
            <p style={{ textAlign: 'center', color: 'rgba(0, 0, 0, .5)', fontSize: '18px', fontWeight: '200', marginBottom: '0px', marginTop: '30px' }}>Favorites</p>
            <PhotoStream photos={favorites}/>
        </>
    );
};

export default Favorites;