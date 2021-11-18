import { POST_DATA } from '../constants';

export const postDataAction = (data) => dispatch => {
 
  dispatch({
    type: POST_DATA,
    payload: data
  });

};