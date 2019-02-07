import React, { Fragment } from 'react';
import {connect} from 'react-redux';
import { Link, Route } from 'react-router-dom';
import { Parser } from 'expr-eval';

import TOOLS_DATA from 'common/constants';
import ACTION from 'common/action_constants';

import Slider from 'components/Slider/Slider';
import Textbox from 'components/Textbox/Textbox';
import Dropdown from 'components/Dropdown/Dropdown';
import Checkbox from 'components/Checkbox/Checkbox';
import Radio from 'components/Radio/Radio';
import Table from 'components/Table/Table';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.querySelectorAll('title')[0].innerHTML = 'Tools and Calculators';
    this.props.dispatch({
      type: ACTION.CALCULATOR.UNLOAD_CALCULATOR_DATA
    });
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        {
          TOOLS_DATA.map(tool => <div key={tool.title}><Link to={tool.route}>{tool.title}</Link></div>)
        }
        <Link to="/graphs">Graphs</Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    home: state.home
  };
};

export default connect(mapStateToProps)(Home);
