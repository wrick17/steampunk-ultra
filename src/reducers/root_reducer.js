import { combineReducers } from 'redux';
import home from './home_reducer';
import calculator from './calculator_reducer';

const rootReducers = combineReducers({
  home,
  calculator
});

export default rootReducers;
