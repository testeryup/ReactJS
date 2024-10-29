import actionTypes from './actionTypes';
import { getAllCodeService } from '../../services/userService';

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("GENDER");
            if(res && res.errCode === 0){
                // console.log('check state get all code of fetch:', getState);
                dispatch(fetchGenderStartSuccess(res.data));
            }
            else{
                dispatch(fetchGenderStartFailed());
            }
        } catch (error) {
            dispatch(fetchGenderStartFailed());
            // console.log('fetch start error', error);
        }
    }
}

export const fetchGenderStartSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderStartFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})