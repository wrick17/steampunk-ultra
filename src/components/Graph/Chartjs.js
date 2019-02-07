import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

const chartData = {
  "labels": ["January", "February", "March", "April", "May", "June", "July"],
  "datasets": [{
    "label": "My First dataset",
    "fillColor": "rgba(220,220,220,0.2)",
    "strokeColor": "rgba(220,220,220,1)",
    "pointColor": "rgba(220,220,220,1)",
    "pointStrokeColor": "#fff",
    "pointHighlightFill": "#fff",
    "pointHighlightStroke": "rgba(220,220,220,1)",
    "data": [72.47305350708237, 58.940833827676, 59.43343439305242, 76.17299745838767, 43.56701628784697, 82.05432785637164, 81.403365453716]
  }, {
    "label": "My Second dataset",
    "fillColor": "rgba(151,187,205,0.2)",
    "strokeColor": "rgba(151,187,205,1)",
    "pointColor": "rgba(151,187,205,1)",
    "pointStrokeColor": "#fff",
    "pointHighlightFill": "#fff",
    "pointHighlightStroke": "rgba(151,187,205,1)",
    "data": [58.403685834056155, 61.502081048788426, 60.712999238635454, 52.907840772406665, 43.94682523699261, 35.55224962610257, 88.13078178984166]
  }]
};

class Chartjs extends Component {
  render() {
    return (
      <div>
        <Line data={chartData} />
      </div>
    );
  }
}

export default Chartjs;
