import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Field } from 'ct-ui-components';

import styles from './Slider.scss';

class Slider extends Component {
  
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.setValue = this.setValue.bind(this);
    this.state = {
      inputValue: Number(props.value)
    };
  }

  componentDidMount() {
    this.setValue();
  }

  setValue() {
    let newValue = this.props.value;
    if (this.props.value < this.props.min) {
      this.props.onChange({
        value: Number(this.props.min),
        name: this.props.id
      });
      newValue = this.props.min;
    }
    if (this.props.value > this.props.max) {
      this.props.onChange({
        value: Number(this.props.max),
        name: this.props.id
      });
      newValue = this.props.max;
    }
    return newValue;
  }

  componentWillReceiveProps(newProps) {
    if (this.state.inputValue !== newProps.value) {
      this.setState({ inputValue: Number(newProps.value) });
    }
  }

  handleChange(e) {
    const { value, name } = e.target;

    if (this.props.onChange && value >= this.props.min && value <= this.props.max) {
      this.props.onChange({
        value: Number(value),
        name: this.props.id
      });
    } else if (!(this.state.inputValue >= this.props.min && this.state.inputValue <= this.props.max)) {
      this.setState({
        inputValue: this.setValue()
      });
    }
  }

  render() {
    return (
      <div className={this.props.class} >
        <h4>
          <span>{this.props.title}</span>
          <span className={styles.value}>
            {
              this.props.editValue ?
              <input
              className={'edit-value'}
              type="number"
              min={this.props.min}
              max={this.props.max}
              disabled={this.props.disabled}
              step={this.props.step}
              onBlur={this.handleChange}
              onChange={e => this.setState({ inputValue: Number(e.target.value) })}
              value={this.state.inputValue} 
              /> :
              this.props.value
            } {this.props.unit}
            </span>
        </h4>
        <div>
          <input
            className={'range-bar'}
            type="range"
            onChange={this.handleChange} 
            value={this.props.value} 
            min={this.props.min} 
            disabled={this.props.disabled}
            max={this.props.max} 
            step={this.props.stepValue} />
        </div>
      </div>
    );
  }
}

Slider.propTypes = {
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number,
  unit: PropTypes.string,
  class: PropTypes.string,
  stepValue: PropTypes.number,
  editValue: PropTypes.bool,
  min: function (props, propName, componentName) { // PropTypes.number.isRequired
    if (!props.min && props.min !== 0) {
      return new Error(`Invalid prop ${propName} provided to ${componentName}. ${propName} was not provided`);
    }
    else if (typeof props.min !== 'number') {
      return new Error(`Invalid prop ${propName} provided to ${componentName}. ${propName} should be of type Number, instead found to be ${typeof props.min}`);
    }
    else if (props.min >= props.max) {
      return new Error(`Invalid prop ${propName} provided to ${componentName}. Min cannot be more than Max`);
    }
  },
  max: function (props, propName, componentName) { // PropTypes.number.isRequired
    if (!props.max && props.max !== 0) {
      return new Error(`Invalid prop ${propName} provided to ${componentName}. ${propName} was not provided`);
    }
    else if (typeof props.max !== 'number') {
      return new Error(`Invalid prop ${propName} provided to ${componentName}. ${propName} should be of type Number, instead found to be ${typeof props.max}`);
    }
    else if (props.min >= props.max) {
      return new Error(`Invalid prop ${propName} provided to ${componentName}. Max cannot be less than Min`);
    }
  },
};

Slider.defaultProps = {
  value: 0,
  unit: '',
  className: '',
  stepValue: 1,
  disabled: false,
  editValue: false,
};

export default Slider;
