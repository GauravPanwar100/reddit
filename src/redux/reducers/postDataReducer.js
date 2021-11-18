import { POST_DATA } from '../constants';

const initialState = {postData:[]};

function postDataReducer (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case POST_DATA:
      return {...state, postData : payload };
    
    default:
      return state;
  }
}

export default postDataReducer;