//how many assigned locker compartment per locker location for example 2/25
const today = new Date();

const threeDaysAgo = new Date(today);
threeDaysAgo.setDate(today.getDate() - 3);
const twoDaysAgo = new Date(today);
twoDaysAgo.setDate(today.getDate() - 2);
const oneDayAgo = new Date(today);
oneDayAgo.setDate(today.getDate() - 1);

const formatDate = date => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

const xArray = [
  formatDate(threeDaysAgo),
  formatDate(twoDaysAgo),
  formatDate(oneDayAgo),
  formatDate(today),
  "Tomorrow"
];

const yArray = [3, 2, 10, 5, 10];

const colors = yArray.map((value, index) => {
  if (index === yArray.length - 1) {
    return "red";
  } else {
    return "rgba(0,0,255,0.6)";
  }
});

const data = [{
  x: xArray,
  y: yArray,
  type: "bar",
  orientation: "v",
  marker: { color: colors }
}];

const layout = {
  yaxis: {
    title: "Locker Occupancy Count"
  },
  xaxis: {
    title: "Date"
  },
  width: 1000,
  font: {
    family: 'Tahoma',
    size: 18
  }
};

Plotly.newPlot("myPlotBar", data, layout);


//LINE CHART open_count against last_used
const xArrayud = ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "23:59"];

//did not fill all cuz maybe havent reach today time yet
const yArrayud = [1, 5, 7, 2, 5,];

const forecastedValue = [2, 3, 8, 2, 6, 9, 13]; 

const dataud = [
  {
    x: xArrayud,
    y: yArrayud,
    mode: "lines",
    type: "scatter",
    name: "Actual"
  },
  {
    x: xArrayud,
    y: forecastedValue,
    mode: "lines",
    type: "scatter",
    name: "Forecasted (Today)",
    line: {color: 'red'}
  }
];

const layoutud = {
  title: "Locker Open Count as of " + formatDate(today),
  xaxis: {
    type: 'time',
    title: "Time Of The Day"
  },
  yaxis: {
    title: "Locker Open Count"
  },
  width: 1000,
  font: {
    family: 'Tahoma',
    size: 18
  }
};

Plotly.newPlot("myPlotLine", dataud, layoutud);

//pie CHART usage_minutes against location

const xArraypie = ["Taylors Homeless Locker", "Pertiwi Soup Kitchen", "SS15", "Chow Kit"]
const yArraypie = [40, 50, 110, 20];

const datapie = [{
  labels: xArraypie,
  values: yArraypie,
  type: "pie",
  hole:.3
}];

const layoutpie = {
  title: "Locker Usage Duration (in minutes)",
  width:1000,
  font: {
      family: 'Tahoma',
      size: 18
  }

};

Plotly.newPlot("myPlotPie", datapie, layoutpie);