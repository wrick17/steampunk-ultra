import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducers from 'reducers/root_reducer';
import Calculator from 'containers/Calculator';
import { AppContainer } from 'react-hot-loader';
import { createLogger } from 'redux-logger';
import { addStyleFiles, asyncDispatchMiddleware } from 'common/utils';

if (module.hot) module.hot.accept();

const logger = createLogger({
  collapsed: true
});

function Calc(config) {

  this.store = createStore(
    rootReducers,
    applyMiddleware(logger, asyncDispatchMiddleware)
  );

  this.init = function () {
    // and react will render the whole stuff into the div with hot module stuff
    const { selector, calculatorData, stylesLink } = config;
    
    ReactDOM.render(
      <AppContainer>
        <Provider store={this.store}>
          <Calculator calculatorData={calculatorData} />
        </Provider>
      </AppContainer>,
      document.querySelector(selector)
    );
  
    // Hot Module Replacement API
    if (module.hot) {
      
      // Enable Webpack hot module replacement for reducers
      module.hot.accept('reducers/root_reducer', () => {
        this.store.replaceReducer(require('reducers/root_reducer').default);
      });
  
      // Enable Webpack hot module replacement for the app
      module.hot.accept('containers/Calculator', () => {
        
        const NextCalculator = require('containers/Calculator').default;
        ReactDOM.render(
          <AppContainer>
            <Provider store={this.store}>
              <NextCalculator calculatorData={calculatorData} />
            </Provider>
          </AppContainer>,
          document.querySelector(selector)
        );
  
      });
    }
  
    addStyleFiles(stylesLink);
  };
  
  return this;
}

window.Calc = Calc;
