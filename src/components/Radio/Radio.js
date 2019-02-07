import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './Radio.scss';

class Radio extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { value, checked } = e.target;
    this.props.onChange({
      value,
      name: this.props.id
    });
  }

  render() {
    const { value, id } = this.props;

    return (
      <div className={cx('radio', this.props.class)} >
        <h4>{this.props.title}</h4>
        {
          this.props.options.map(radio => (
            <label key={radio.value}>
              <input type="radio" name={id} value={radio.value} checked={(radio.value === this.props.value) ? 'checked' : false} onChange={this.onChange} disabled={this.props.disabled} />
              <span>{radio.label}</span>
            </label>
          ))
        }
      </div>
    );
  }
}

Radio.propTypes = {
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  class: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.array.isRequired
};

export default Radio;
