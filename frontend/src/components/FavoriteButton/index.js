import { AiOutlineHeart, AiTwotoneHeart } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, deleteFavorite } from '../../store/favorites';

function FavoriteButton({photoId, favorites}) {
    const dispatch = useDispatch();

    const userId = useSelector(state => state.session.user.id);

    const [favorited, setFavorited] = useState(false);

    useEffect(() => {
        const favorite = favorites?.find(favorite => favorite.photoId === +photoId )
        const favoriteBool = favorite === undefined ? false : true;
        setFavorited(favoriteBool);
    }, []);

    const toggleFavorite = () => {
        if(!favorited) {
            setFavorited(!favorited);
            dispatch(addFavorite(userId, photoId));
        } else {
            console.log('I"M IN THE ELSE STATEMENT')
            setFavorited(!favorited);
            dispatch(deleteFavorite(userId, photoId));
        };
    };
    
    return (
        <>
            {favorited 
                ? 
                    <button onClick={toggleFavorite} > <AiTwotoneHeart /></button>
                :
                    <button onClick={toggleFavorite} > <AiOutlineHeart /></button>
            }
        </>
    );
};

export default FavoriteButton;