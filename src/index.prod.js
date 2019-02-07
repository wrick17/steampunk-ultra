import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducers from 'reducers/root_reducer';
import Calculator from 'containers/Calculator';
import { addStyleFiles, asyncDispatchMiddleware } from 'common/utils';

function Calc(config) {

  this.store = createStore(
    rootReducers,
    applyMiddleware(asyncDispatchMiddleware)
  );

  this.init = function () {
    
    const { selector, calculatorData, stylesLink } = config;

    ReactDOM.render(
      <Provider store={this.store}>
        <Calculator calculatorData={calculatorData} />
      </Provider>,
      document.querySelector(selector)
    );

    addStyleFiles(stylesLink);
  };

  return this;
}

window.Calc = Calc;
