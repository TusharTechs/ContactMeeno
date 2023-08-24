import { combineReducers, createStore } from 'redux';
import contactReducer from './contactReducer';

// Combine your reducers and create the root reducer
const rootReducer = combineReducers({
  contacts: contactReducer,
});

// Define the type of your root state
export type RootState = ReturnType<typeof rootReducer>;

// Create the Redux store
const store = createStore(rootReducer);

export default store;