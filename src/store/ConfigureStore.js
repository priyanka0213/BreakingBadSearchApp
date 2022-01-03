import {createStore, applyMiddleware} from 'redux';
import reducer from './reducer/index';
export default function ConfigureStore() {
  const store = createStore(reducer);
  return store;
}
const store = ConfigureStore();
store.subscribe = () => {
  console.log(store.getState());
};
console.log(store.getState(), 'storeee');
