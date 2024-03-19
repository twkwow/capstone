function formatDate(date) {
	return moment(date).format("DD/MMM/yyyy");
};



//how many assigned locker compartment per locker location for example 2/25
async function renderOccupancyCount(width) {
	const occupancyCount = (await axios.post(apiLink + "admins/dataAnalytics/getOccupancyCount")).data
	if (!occupancyCount) {
		return showSnackbar("apiError")
	}
	//x-axis dates
	const xAxis = occupancyCount.xAxis.map((x) => formatDate(x))
	xAxis.push("Today's Prediction")

	//data
	const yAxis = occupancyCount.yAxis
	// yAxis.push(45)

	const colors = yAxis.map((value, index) => {
		return index === yAxis.length - 1 ? "red" : "rgba(0,0,255,0.6)"
	});

	const data = [
		{
			x: xAxis,
			y: yAxis,
			type: "bar",
			orientation: "v",
			marker: { color: colors },
		},
	];

	const layout = {
		yaxis: { 'range': [0, occupancyCount.yAxisPeak]},
		width: width,
		margin: {
			b:100,
			t:20
		},
		font: {
			family: "Tahoma",
			size: 18,
		},
	};
	Plotly.newPlot("myPlotBar", data, layout);
}

async function reRenderOccupancyCount(occupancyId) {
	
	const occupancyForm = new FormData()
	occupancyForm.append("locationId", occupancyId)
	const occupancyCount = (await axios.post(apiLink + "admins/dataAnalytics/getOccupancyCount", occupancyForm)).data
	if (!occupancyCount) {
		return showSnackbar("apiError")
	}

	const newXAxis = occupancyCount.xAxis.map((x) =>  formatDate(x))
	newXAxis.push("Today's Prediction")

	const newData = {
		y: [occupancyCount.yAxis],
		x: [newXAxis]
	}
	const newLayout = {
		yaxis: { 'range': [0, occupancyCount.yAxisPeak]},
	}

	Plotly.update("myPlotBar", newData, newLayout)
}

async function renderDemandForecast() {
	const demandForecast = (await axios.post(apiLink + "admins/dataAnalytics/getDemandForecast")).data
	if (!demandForecast) {
		return showSnackbar("apiError")
	}

	const data = [
		{
			x: demandForecast.xAxis,
			y: demandForecast.yAxis,
			mode: "lines",
			type: "scatter",
			name: "Actual",
		},
		{
			x: demandForecast.xAxis,
			y: demandForecast.yForecast,
			mode: "lines",
			type: "scatter",
			name: "Forecasted (Today)",
			line: { color: "red" },
		},
	];
	
	const layout = {
		title: "Locker Open Count as of " + formatDate(demandForecast.date),
		xaxis: {
			type: "time",
			title: "Time Of The Day",
		},
		yaxis: {
			title: "Locker Open Count",
		},
		width: 1150,
		font: {
			family: "Tahoma",
			size: 18,
		},
	};

	Plotly.newPlot("myPlotLine", data, layout);
}

async function reRenderDemandForecast(demandId) {
	const demandForm = new FormData()
	demandForm.append("locationId", demandId)
	const demandForecast = (await axios.post(apiLink + "admins/dataAnalytics/getDemandForecast", demandForm)).data
	if (!demandForecast) {
		return showSnackbar("apiError")
	}
	const newData = {
        x: [demandForecast.xAxis],
        y: [demandForecast.yAxis, demandForecast.yForecast],
    };

	const newLayout = {
		title: "Locker Occupancy Count as of " + formatDate(demandForecast.date),
	};

	Plotly.update("myPlotLine", newData, newLayout)
}

//pie CHART usage_minutes against location
async function renderLockerUsages() {
	const lockerUsages = (await axios.get(apiLink + "admins/dataAnalytics/getLockerUsages")).data
	if (!lockerUsages)  {
		return showSnackbar("apiError")
	}

	const data = [
		{
			labels: lockerUsages.labels,
			values: lockerUsages.values,
			type: "pie",
			hole: 0.3,
		},
	];
	
	const layout = {
		title: "Locker Usage Duration (in minutes)",
		width: 1100,
		font: {
			family: "Tahoma",
			size: 18,
		},
	};
	
	Plotly.newPlot("myPlotPie", data, layout);
}

async function reRenderLockerUsages() {
	const lockerUsages = (await axios.get(apiLink + "admins/dataAnalytics/getLockerUsages")).data
	if (!lockerUsages)  {
		return showSnackbar("apiError")
	}

	const newData = {
		labels: [lockerUsages.labels],
		values: [lockerUsages.values],
	}
	
	
	Plotly.restyle("myPlotPie", newData);
}

async function renderRegisteredWeb() {
	const users = (await axios.get(apiLink + "admins/dataAnalytics/getRegisteredWebUsers")).data
	if (!users) {
		return showSnackbar("apiError")
	}
	const datapie2 = [{
		labels: ["Registered Users", "Unregistered Users"],
		values: [users.registered, users.total - users.registered],
		type: "pie",
		hole:.3
	}];

	const layoutpie2 = {
		width:1100,
		font: {
			family: 'Tahoma',
			size: 18
		} 
	};

	Plotly.newPlot("myPlotPie2", datapie2, layoutpie2);
}

async function reRenderRegisteredWeb() {
	const users = (await axios.get(apiLink + "admins/dataAnalytics/getRegisteredWebUsers")).data
	if (!users) {
		return showSnackbar("apiError")
	}

	const newData = {
		values: [[users.registered, users.total - users.registered]]
	}

	Plotly.restyle("myPlotPie2", newData);
}