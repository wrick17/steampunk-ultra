import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './Table.scss';

class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.generateTable = this.generateTable.bind(this);
  }

  generateTable(data, className, id) {
    if (!data || data.length === 0) {
      return null;
    }
    return (
      <table className={className} name={id} >      
        <thead>
          <tr>
            {
              data[0].map(column => <th key={(data[0].toString() + column)} >{column}</th>)
            }
          </tr>
        </thead>
        <tbody>
          {
            data.slice(1).map(row => {
              return (
                <tr key={row.toString()} >
                  {
                    row.map(column => <td key={(row.toString() + column)} >{column}</td>)
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }

  render() {
    return (
      <div>
        { this.props.hideTitle ? null : <h4>{ this.props.title }</h4> }
        {this.generateTable(this.props.data, cx(styles.table, this.props.class), this.props.id) }
      </div>
    );
  }
}

TableComponent.propTypes = {
  title: PropTypes.string.isRequired,
  formula: PropTypes.func,
  hideTitle: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])))
};

export default TableComponent;
