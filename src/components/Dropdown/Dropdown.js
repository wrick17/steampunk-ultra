import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './Dropdown.scss';

class Dropdown extends Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { value } = e.target;
    if (this.props.onChange) {
      this.props.onChange({
        value,
        name: this.props.id
      });
    }
  }

  render() {
    return (
      <div className={cx('paper', this.props.class)} >
        <label>{this.props.title}</label>
        <fieldset className={'f f-normal'}>
          <select name={this.props.id} id={this.props.id} onChange={this.onChange} disabled={this.props.disabled} >
            {
              this.props.options.map(option => <option value={option.value} key={option.label + option.value} >{option.label}</option> )
            }
          </select>
        </fieldset>
        <p></p>
      </div>
    );
  }
}

Dropdown.propTypes = {
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  class: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.array.isRequired
};

export default Dropdown;
