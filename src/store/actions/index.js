import {ADD_ITEM, ADD_DATA} from './Types';
export const favouriteAction = (data) => ({
  type: ADD_ITEM,
  payload: data,
});

export const dataAction = (data) => ({
  type: ADD_DATA,
  payload: data,
});
