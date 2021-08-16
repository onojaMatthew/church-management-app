import React from "react";

import { Chart } from "react-google-charts";

const Charts = () => {
  return (
    <Chart
      width={600}
      height={400}
      chartType="ColumnChart"
      loader={<div>Loading Chart</div>}
      data={[
        ['City', 'Female Members', 'Male Members'],
        ['Jan', 500, 8000],
        ['Feb', 2000, 4000],
        ['Mar', 5000, 6000],
        ['Apr', 9000, 3000],
        ['May', 6000, 7000],
        ['Jun', 6000, 7000],
        ['Jul', 5000, 3000],
        ['Aug', 3000, 6000],
        ['Sep', 6000, 7000],
        ['Oct', 7000, 6000],
        ['Nov', 4000, 6000],
        ['Dec', 6000, 7000],
      ]}
      options={{
        title: 'Number of new members',
        chartArea: { width: '70%' },
        hAxis: {
          title: 'Month',
          minValue: 0,
        },
        vAxis: {
          title: 'New Members',
        },
      }}
      legendToggle
    />
  )
}

export default Charts;