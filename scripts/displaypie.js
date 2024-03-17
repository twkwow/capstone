const xArraypie2 = ["Registered Users", "Unregistered Users"]
const yArraypie2 = [3, 80];

const datapie2 = [{
  labels: xArraypie2,
  values: yArraypie2,
  type: "pie",
  hole:.3
}];

const layoutpie2 = {
  width:1000,
  font: {
      family: 'Tahoma',
      size: 18
  } 

};

Plotly.newPlot("myPlotPie2", datapie2, layoutpie2);