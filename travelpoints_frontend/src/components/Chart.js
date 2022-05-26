import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const Chart = ({ chartValues, labels, name, color }) => {
  return (
    <div className="my-chart">
      <Bar
        data={{
          labels: labels,
          datasets: [
            {
              label: name,
              backgroundColor: color,
              borderColor: 'rgb(255, 99, 132)',
              data: chartValues,
            },
          ],
        }}
        height={400}
        width={800}
      />
    </div>
  );
};

Chart.prototype = {
  chartValues: PropTypes.object,
};

export default Chart;
