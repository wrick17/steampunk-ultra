import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './Checkbox.scss';

class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      options: this.props.options
    };
  }

  onChange(e) {
    const { value, checked } = e.target;
    const originalValue = this.props.value;
    if (checked) {
      originalValue.push(value);
    } else {
      originalValue.splice( originalValue.indexOf(value), 1 );
    }
    this.props.onChange({
      value: originalValue,
      name: this.props.id
    });
  }

  render() {
    const { value, id } = this.props;
    return (
      <div className={cx('checkbox', this.props.class)}>
        <h4>{this.props.title}</h4>
        {
          this.state.options.map(check => (
            <label key={check.value}>
              <input type="checkbox" name={id} value={check.value} checked={(value.indexOf(check.value) !== -1)} onChange={this.onChange} disabled={this.props.disabled} />
              <span>{check.label}</span>
            </label>
          ))
        }
      </div>
    );
  }
}

Checkbox.propTypes = {
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  class: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.string),
  options: PropTypes.array.isRequired
};

export default Checkbox;
