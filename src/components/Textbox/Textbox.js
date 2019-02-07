import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'ct-ui-components';
import cx from 'classnames';

import styles from './Textbox.scss';

class Textbox extends Component {
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
        <Field
          type={'text'}
          name={this.props.id}
          labelName={this.props.title}
          onChange={this.onChange}
          disabled={this.props.disabled}
          id={this.props.id}
          placeholder={this.props.placeholder}
          value={this.props.value}
          description={''} />
      </div>
    );
  }
}

Textbox.propTypes = {
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  class: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string
};

export default Textbox;
