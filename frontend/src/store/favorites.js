import { csrfFetch } from "./csrf";

const GET_FAVORITES = 'favorites/GET_FAVORITES';
const ADD_FAVORITE = 'favorites/ADD_FAVORITE';
const DELETE_FAVORITE = 'favorites/DELETE_FAVORITE';

const getFavoriteAction = (favorites) => {
    return {
        type: GET_FAVORITES,
        favorites
    };
};

const addFavoriteAction = (favorite) => {
    return {
        type: ADD_FAVORITE,
        favorite
    };
};

const deleteFavoriteAction = (favoriteId) => {
    return {
        type: DELETE_FAVORITE,
        favoriteId
    };
};

export const getFavorites = (userId) => async(dispatch) => {
    const response = await csrfFetch(`/api/users/${userId}/favorites`)
    const favorites = await response.json()
    dispatch(getFavoriteAction(favorites)) 
    return
}

export const addFavorite = (userId, photoId) => async(dispatch) => {
    const body = {
        photoId
    }
    const response = await csrfFetch(`/api/users/${userId}/favorites`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
    const favorite = await response.json();
    dispatch(addFavoriteAction(favorite));
}

export const deleteFavorite = (userId, photoId) => async(dispatch) => {
    const body = {
        photoId
    }
    const response = await csrfFetch(`/api/users/${userId}/favorites`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
    const photo = await response.json();
    
    dispatch(deleteFavoriteAction(photoId))
}

const initialState = {
    favorites: null
};

const favoriteReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_FAVORITES:
            newState = Object.assign({}, state);   
            newState.favorites = action.favorites;                    
            return newState;
        case ADD_FAVORITE:
            newState = Object.assign({}, state);
            newState.favorites = [...newState.favorites, action.favorite]              
            return newState;
        case DELETE_FAVORITE:
            newState = Object.assign({}, state); 
            const favorites = newState.favorites.filter(favorite => favorite.id !== action.favoriteId);
            newState.favorites = favorites;                       
            return newState;
        default:
            return state;
    };
};

export default favoriteReducer