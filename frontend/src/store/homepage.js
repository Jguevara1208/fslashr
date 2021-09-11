import { csrfFetch } from "./csrf"

const GET_INFO = 'homepage/GET_INFO'

const homepageFeedPhotos = (photos) => {
    return {
        type: GET_INFO,
        photos
    }
}

export const getInfoThunk = (userId) => async (dispatch) =>{
    const response = await csrfFetch('/api/home')
    const photos = await response.json()
    dispatch(homepageFeedPhotos(photos))
    return photos
}

const homepageReducer = (state={feed: null}, action) => {
    let newState;
    switch (action.type) {
        case GET_INFO:
            newState = Object.assign({}, state)
            newState.feed = action.photos
            return newState
        default:
            return state;
    }
}

export default homepageReducer;