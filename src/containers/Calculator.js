import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import qs from 'query-string';

import ACTION from 'common/action_constants';
import { COMPONENT_MAP } from 'common/constants';

import globalStyles from './global.css';
import styles from './Calculators.scss';
import { calculateField, convertToBoolean } from 'common/utils';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    const state = {};
    this.changeValue = this.changeValue.bind(this);
    this.showNextStep = this.showNextStep.bind(this);
    this.showPrevStep = this.showPrevStep.bind(this);
  }

  componentDidMount() {

    this.props.dispatch({
      type: ACTION.CALCULATOR.LOAD_DATA,
      data: this.props.calculatorData
    });
  }

  changeValue(e) {
    const { name, value } = e;
    this.props.dispatch({
      type: ACTION.CALCULATOR.CHANGE_FIELD_VALUE,
      field: {
        id: name,
        value,
      },
    });
  }

  showNextStep() {
    this.props.dispatch({
      type: ACTION.CALCULATOR.SHOW_NEXT_STEP
    });
  }

  showPrevStep() {
    this.props.dispatch({
      type: ACTION.CALCULATOR.SHOW_PREVIOUS_STEP
    });
  }

  render() {

    const { calculator } = this.props;
    const { title, fields, steps, step, lastStep } = calculator;    

    if (!calculator.hasOwnProperty('title')) return (<div>Loading....</div>);

    return (
      <div className={'calculator-wrapper'}>
        <h1>{title}</h1>
        <hr/>
        {
          Object.keys(fields).map((fieldKey) => {
            const field = fields[fieldKey];

            const hide = convertToBoolean(calculateField(fields, fieldKey, 'hide'));
            const disabled = convertToBoolean(calculateField(fields, fieldKey, 'disabled'));
            const min = field.hasOwnProperty('min') ? Number(calculateField(fields, fieldKey, 'min')) : undefined;
            const max = field.hasOwnProperty('max') ? Number(calculateField(fields, fieldKey, 'max')) : undefined;

            if ( hide ) return;

            if (field.step ? ( typeof field.step === 'number' ? (field.step === step) : (field.step.indexOf(step) !== -1) ) : true) {
              const Component = COMPONENT_MAP[field.type];
              
              return (
                <div key={fieldKey}>
                  <Component onChange={this.changeValue} id={fieldKey} {...field} disabled={disabled} min={min} max={max} />
                </div>
              );
            }
          })
        }
        {
          steps && (
            <div className={'button-group paper'} >
              {<button disabled={step === 1} onClick={this.showPrevStep} className={'b b-p-secondary'} >Back</button>}
              {<button disabled={step === lastStep} onClick={this.showNextStep} className={'b b-p-primary'} >Next</button>}
            </div>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  calculator: state.calculator,
});

export default connect(mapStateToProps)(Calculator);
