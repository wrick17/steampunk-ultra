// import { Parser } from 'expr-eval';
import { Parser } from 'hot-formula-parser';

export const asyncDispatchMiddleware = store => next => action => {
  let syncActivityFinished = false;
  let actionQueue = [];

  function flushQueue() {
    actionQueue.forEach(a => store.dispatch(a)); // flush queue
    actionQueue = [];
  }

  function asyncDispatch(asyncAction) {
    actionQueue = actionQueue.concat([asyncAction]);

    if (syncActivityFinished) {
      flushQueue();
    }
  }

  const actionWithAsyncDispatch =
    Object.assign({}, action, { asyncDispatch });

  next(actionWithAsyncDispatch);
  syncActivityFinished = true;
  flushQueue();
};

export function convertToBoolean(value) {
  if (typeof value === 'boolean') {
    return value;
  }
  else {
    return value.toLowerCase() === 'true' ? true : false;
  }
}

export function calculateField(fields, fieldKey, key) {  
  if (!fields[fieldKey].hasOwnProperty(key)) return '';
  if (typeof fields[fieldKey][key] === 'function') {
    return fields[fieldKey][key](fields);
  }
  else if (typeof fields[fieldKey][key] === 'string') {
    const parser = new Parser();
    Object.keys(fields).forEach(field => parser.setVariable([field], fields[field].value));
    return parser.parse(fields[fieldKey][key]).result;
  }
  else {
    return fields[fieldKey][key];
  }
}

export function calculateResult(fields, fieldKey, callback) {
  
  if (fields.hasOwnProperty(fieldKey)) {
    const formula = fields[fieldKey].formula;

    if (typeof formula === 'function') {
      return formula(fields, result => {
        callback(result, fieldKey);
      });
    }
    const parser = new Parser();
    Object.keys(fields).forEach(field => parser.setVariable([field], fields[field].value));
    return parser.parse(formula).result;
  }
  
  return 0;
}

export function calculateResultFromState(state, callback, avoidKey) {
  for (const fieldKey in state) {
    if (state.hasOwnProperty(fieldKey) && state[fieldKey].type === 'output' || state.hasOwnProperty(fieldKey) && state[fieldKey].type === 'table') {
      const field = state[fieldKey];
      let result = state[fieldKey].value;
      if (avoidKey !== fieldKey) {
        result = calculateResult(state, fieldKey, callback);  
      }

      if (state.hasOwnProperty(fieldKey) && state[fieldKey].type === 'output') {
        state[fieldKey].value = result;
      } else {
        state[fieldKey].data = result || state[fieldKey].data;
      }
    }
  }
  return state;
}

export function calculateTableData(fields, fieldKey) {
  if (fields.hasOwnProperty(fieldKey)) {
    const formula = fields[fieldKey].formula;
    
    if (typeof formula === 'function') {      
      return formula(fields);
    } else {
      return fields[fieldKey].data;
    }
  }

  return [];
}

export function _convertToCurrency(num, decimalPlaces = 2, currency = '₹', suffix = false) {
  if (!num && num !== 0) return num;
  if (num === 0) return '0';
  let dot = '';
  if (num.toString().split('.').length > 1) {
    dot = `.${num.toString().split('.')[1]}`;
    dot = dot.substr(0, decimalPlaces + 1);
  }
  let n1, n2;
  num = `${parseInt(num)}` === 'NaN' ? '' : parseInt(num);
  n1 = num.toString().split('.');
  n2 = n1[1] || null;
  n1 = n1[0].replace(/(\d)(?=(\d\d)+\d$)/g, '$1,');
  num = n2 ? `${n1}.${n2}` : n1;
  return suffix ? `${num}${dot}${currency}` : `${currency}${num}${dot}`;
}

export function convertToCurrency(num, decimalPlaces, currency, suffix) {
  return _convertToCurrency(num, decimalPlaces, currency, suffix);
}

window.convertToCurrency = convertToCurrency;

export function addCommas(num, decimalPlaces) {
  return _convertToCurrency(num, decimalPlaces, '');
}

window.addCommas = addCommas;

export function convertToNumber(currency) {
  if (typeof currency === 'number' || !currency) return currency;
  return currency.replace(/[^0-9.]/g, '');
}

export function calculateLastStep(tempState) {
  if (tempState.steps) {
    let stepsArray = [];
    for (const field in tempState.fields) {
      if (typeof tempState.fields[field].step === 'number') {
        stepsArray.push(tempState.fields[field].step);
      } else {
        stepsArray = [...stepsArray, ...tempState.fields[field].step];
      }
    }
    const lastStep = Math.max.apply(null, stepsArray);
    tempState.lastStep = lastStep;
    tempState.step = 1;
  }
  return tempState;
}

export function addStyleFiles(stylesLink) {
  if (!stylesLink || !stylesLink.length) return;
  
  function addStyle(style, elId) {
    (function (d, s, id) {
      var css, fcss = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      css = d.createElement(s); css.id = id; css.rel = 'stylesheet'; css.type = 'text/css';
      css.href = style;
      fcss ? fcss.parentNode.insertBefore(css, fcss) : d.head.appendChild(css);
    }(document, 'link', elId));
  }

  if (typeof stylesLink === 'object' && stylesLink.length) {
    stylesLink.forEach(function (style, index) {
      addStyle(style, 'calculator-styles-' + index);
    });
  } else {
    addStyle(stylesLink, 'calculator-styles');
  }
}
