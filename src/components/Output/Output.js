import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { convertToCurrency } from 'common/utils';

import styles from './Output.scss';

class Output extends Component {
  render() {
    return (
      (typeof this.props.formula === 'string' && typeof this.props.customHtml !== 'function') ?
      <div className={cx(styles.output, this.props.class)} >
        <label>{this.props.title}</label> 
        <span>{ this.props.isCurrency ? convertToCurrency(this.props.value, this.props.decimalPlaces, this.props.currency, this.props.isCurrencySuffix) : JSON.stringify(this.props.value) }</span>
      </div> :
        <div className={cx(styles.output, this.props.class)} dangerouslySetInnerHTML={{ __html: (typeof this.props.customHtml === 'function' ? this.props.customHtml(this.props.value) : this.props.value) }} />
    );
  }
}

Output.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  formula: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  isCurrency: PropTypes.bool,
  step: PropTypes.number,
  class: PropTypes.string
};

export default Output;
