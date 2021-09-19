import PhotoStream from '../../PhotoStream';
import { getFavorites } from '../../../store/userInfo';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';


function Favorites() {
    const dispatch = useDispatch();
    const { userId } = useParams()


    const favorites = useSelector(state => state.currentUser.favorites);


    useEffect(() => {
        dispatch(getFavorites(userId))
    }, [])

    return (
        <>
            <p style={{ textAlign: 'center', color: 'rgba(0, 0, 0, .5)', fontSize: '18px', fontWeight: '200', marginBottom: '0px', marginTop: '30px' }}>Favorites</p>
            <PhotoStream photos={favorites}/>
        </>
    );
};

export default Favorites;