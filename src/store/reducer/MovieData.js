import {ADD_DATA} from '../actions/Types';
const initialState = {
  actionLogs: [],
  errorMsg: null,
};
export default MovieDataReducer = (state = initialState, action) => {
  // console.log(action.payload, 'moviewDataaaaReddd');
  switch (action.type) {
    case ADD_DATA: {
      return {
        ...state,
        actionLogs: [...state.actionLogs, action.payload],
      };
    }
    default: {
      return state;
    }
  }
};
