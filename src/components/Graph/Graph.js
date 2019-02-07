import React, { Component } from 'react';
import Loadable from 'components/Loadable';

const ReCharts = Loadable({ loader: () => import('components/Graph/ReCharts') });
const Vis = Loadable({ loader: () => import('components/Graph/Vis') });
const Chartjs = Loadable({ loader: () => import('components/Graph/Chartjs') });
const Semiotic = Loadable({ loader: () => import('components/Graph/Semiotic') });

class Graph extends Component {
  render() {
    return (
      <div>
        <ReCharts />
        <Vis />
        <Chartjs />
        <Semiotic />
      </div>
    );
  }
}

export default Graph;

// Dev
// ReCharts - 159kB
// Chartjs - 192kB
// VIS - 192kB
// Semiotic - 340kB

// Prod
// recharts - 91
// semiotic - 178
// chartjs - 114
// vis - 81
