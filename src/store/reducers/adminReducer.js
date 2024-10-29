import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    positions: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            // console.log('fire start fetch gender hoidanit pro', action);
            return {
                ...state,

            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            let copyState = {...state};
            // console.log('copyState before:', copyState);
            copyState.genders = action.data;
            // console.log('copyState after:', copyState);
            // console.log('success fire fetch gender hoidanit pro', action);
            return copyState
        case actionTypes.FETCH_GENDER_FAILED:
            console.log('failed fire fetch gender hoidanit pro', action);
            return {
                ...state,

            }
        default:
            return state;
    }
}

export default adminReducer;