import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

const getLineData = (curve) => {
  if (!Array.isArray(curve)) {
    curve = [];
  }
  return {
    datasets: [
      {
        label: 'Fan Curve',
        data: curve.map(([temp, speed]) => ({ x: temp, y: speed })),
      },
    ],
  };
};

const chartOptions = {
  dragData: true,
  scales: {
    yAxes: [
      {
        max: 100,
        min: 20,
      },
    ],
    xAxes: [
      {
        max: 100,
        min: 20,
      },
    ],
  },
};

class CoolingCurveEditor extends Component {
  render() {
    return <Line data={getLineData(this.props.curve)} />;
  }
}
export default CoolingCurveEditor;
