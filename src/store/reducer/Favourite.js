import {FAVOURITE_ACTIONS, ADD_ITEM, FAVOURITE_FAILURE} from '../actions/Types';

const initialState = {
  actionLogs: [],
  errorMsg: null,
};

export default FavouriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case FAVOURITE_ACTIONS: {
      return {
        ...state,
      };
    }
    case ADD_ITEM:
      let favouriteExists = false;
      if (state.actionLogs.length !== null) {
        console.log(
          state.actionLogs,
          'stateeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        );

        state.actionLogs.map((item) => {
          if (item.name == action.payload.name) {
            favouriteExists = true;
            // break;
          }
        });
        //   for (const i in state) {
        //     if (state[i].favouriteName == action.favouriteName) {
        //       favouriteExists = true;
        //       break;
        //     }
        //   }
      }
      if (favouriteExists) {
        console.log(favouriteExists, 'lalalalallala');
        return state;
      } else {
        console.log(favouriteExists, 'elseeeelalalalallala');
        return {
          ...state,
          actionLogs: [...state.actionLogs, action.payload],
        };
      }

    case FAVOURITE_FAILURE: {
      return {
        ...state,
        errorMsg: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
