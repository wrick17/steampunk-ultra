import ACTION from 'common/action_constants';
import TOOLS_DATA from 'common/constants';
import { calculateResult, calculateTableData, calculateResultFromState, calculateLastStep } from 'common/utils';

function fields(state = {}, action) {
  let tempState = Object.assign({}, state);
  
  switch (action.type) {
    case ACTION.CALCULATOR.CHANGE_FIELD_VALUE: {
      tempState[action.field.id].value = action.field.value;

      tempState = calculateResultFromState(tempState, (result, fieldKey) => action.asyncDispatch({
        type: ACTION.CALCULATOR.CHANGE_FIELD_VALUE,
        field: {
          id: fieldKey,
          value: result,
        },
      }), action.field.id);

      return tempState;
    }

    default:
      return state;
  }
}

function calculator(state = {}, action) {
  let tempState = Object.assign({}, state);

  switch (action.type) {
    case ACTION.CALCULATOR.LOAD_DATA: {
      tempState = action.data;

      tempState.loaded = true;
      tempState.fields = fields(tempState.fields, action);

      tempState = calculateLastStep(tempState);

      tempState.fields = calculateResultFromState(tempState.fields, (result, fieldKey) => action.asyncDispatch({
        type: ACTION.CALCULATOR.CHANGE_FIELD_VALUE,
        field: {
          id: fieldKey,
          value: result,
        },
      }));

      return tempState;
    }

    case ACTION.CALCULATOR.CHANGE_FIELD_VALUE: {
      tempState.fields = fields(tempState.fields, action);
      return tempState;
    }

    case ACTION.CALCULATOR.SHOW_NEXT_STEP: {
      tempState.step = tempState.step + 1;
      return tempState;
    }

    case ACTION.CALCULATOR.SHOW_PREVIOUS_STEP: {
      tempState.step = tempState.step - 1;
      return tempState;
    }

    case ACTION.CALCULATOR.UNLOAD_CALCULATOR_DATA: {
      return {};
    }

    default: {
      return state;
    }
  }

}
export default calculator;
