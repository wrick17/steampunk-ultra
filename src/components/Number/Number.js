import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'ct-ui-components';
import { convertToCurrency, convertToNumber, addCommas } from 'common/utils';
import cx from 'classnames';

import styles from './Number.scss';

class Numberbox extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, value: this.props.value };
    this.onChangeValue = this.onChangeValue.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.value !== newProps.value) {
      this.setState({ 
        value: newProps.value
      });
    }
  }

  onChangeValue(e) {
    const { value } = e.target;
    let val = value;

    if (isNaN(Number(convertToNumber(val)))) return;
    
    if (this.state.value.toString() === convertToNumber(value).toString() && convertToCurrency(this.state.value, this.props.decimalPlaces, this.props.currency, this.props.isCurrencySuffix).length >= value.length && this.props.isCurrencySuffix) {
      const currencyLength = this.props.currency.length || 1;
      val = value.substr(0, value.length - currencyLength);
    }

    if (convertToNumber(val).toString() !== Number(convertToNumber(val)).toString()) return this.setState({ value: convertToNumber(val) });
    else val = Number(convertToNumber(val));
    
    if (this.props.onChange) {
      if (val > this.props.max) {
        this.setState({
          error: `It can't be more than ${this.props.max}`,
          value: val
        });
      }
      else if (val < this.props.min) {
        this.setState({
          error: `It can't be less than ${this.props.min}`,
          value: val
        });
      }
      else {
        this.setState({
          error: null,
          value: val
        });
      }
      this.props.onChange({
        value: val,
        name: this.props.id
      });
    }
  }

  render() {    
    return (
      <div className={cx('paper', this.props.class)} >
        <Field
          type={'text'}
          name={this.props.id}
          labelName={this.props.title}
          onChange={this.onChangeValue}
          id={this.props.id}
          disabled={this.props.disabled}
          placeholder={this.props.placeholder}
          value={this.props.isCurrency ? convertToCurrency(this.state.value, this.props.decimalPlaces, this.props.currency, this.props.isCurrencySuffix) : addCommas(this.state.value) }
          validationMessage={this.state.error}
          isInvalid={this.state.error ? true : false}
          description={''} />
      </div>
    );
  }
}

Numberbox.propTypes = {
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  class: PropTypes.string,
  value: PropTypes.number,
  placeholder: PropTypes.string,
  isCurrency: PropTypes.bool,
};

export default Numberbox;
