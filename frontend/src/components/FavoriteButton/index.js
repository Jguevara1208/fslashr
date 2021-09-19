import { AiOutlineHeart, AiTwotoneHeart } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, deleteFavorite } from '../../store/favorites';
import favs from './FavoriteButton.module.css'

function FavoriteButton({photoId, favorites, bool}) {
    const dispatch = useDispatch();

    const userId = useSelector(state => state?.session?.user?.id);
    const [favorited, setFavorited] = useState(false);

    useEffect(() => {
        const favorite = favorites?.find(favorite => favorite.photoId === +photoId);
        const favoriteBool = favorite === undefined ? false : true;
        setFavorited(favoriteBool);
    }, []);

    const toggleFavorite = () => {
        if(!favorited) {
            setFavorited(!favorited);
            dispatch(addFavorite(userId, photoId));
        } else {
            setFavorited(!favorited);
            dispatch(deleteFavorite(userId, photoId));
        };
    };
    
    return (
        <>
            {favorited 
                ? 
                <button className={bool ? `${favs.button2} ${favs.active2}` : `${favs.button} ${favs.active}`} onClick={toggleFavorite} > <AiTwotoneHeart /></button>
                :
                <button className={bool ? `${favs.button2} ${favs.notActive2}`: `${favs.button} ${favs.notActive}`} onClick={toggleFavorite} > <AiOutlineHeart /></button>
            }
        </>
    );
};

export default FavoriteButton;