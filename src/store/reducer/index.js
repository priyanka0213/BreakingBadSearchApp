import {combineReducers} from 'redux';
import FavouriteReducer from './Favourite';
import MovieDataReducer from './MovieData';
const rootReducer = combineReducers({
  FavouriteReducer: FavouriteReducer,
  MovieDataReducer: MovieDataReducer,
});
export default rootReducer;
