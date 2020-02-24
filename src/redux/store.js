import { createStore } from 'redux';
import { reducer } from './reducer.js';

const STORAGE_KEY = '__todo_app__';


const saveState = state => {
  console.log("abcd");
  
  //localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};
const loadState = () => {
  const json = localStorage.getItem(STORAGE_KEY);
  return json ? JSON.parse(json) : undefined;
};

export const store = createStore(
  reducer,
  loadState(),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  console.log("abcd1");
  saveState(store.getState());
});
