export const options = {
	responsive: true,
	legend: {
		display: false,
	},
	type: "bar",
	scales: {
		xAxes: [
			{
				stacked: true,
			},
		],
		yAxes: [
			{
				stacked: true,
			},
		],
	},
};

export const attendanceGraphDefaults = {
	labels: [
		"Session 1",
		"Session 2",
		"Session 3",
		"Session 4",
		"Session 5",
		"Session 6",
		"Session 7",
	],
	datasets: [
		{
			label: "Students",
			backgroundColor: "rgba(150,224,247)",
			borderColor: "rgba(8,171,219)",
			borderWidth: 1,
			stack: 1,
			hoverBackgroundColor: "rgba(8,171,219)",
			hoverBorderColor: "rgba(8,171,219)",
			data: [65, 59, 80, 81, 56, 55, 40],
		},
		{
			label: "Mentors",
			backgroundColor: "rgba(240, 158, 170)",
			borderColor: "#E1304C",
			borderWidth: 1,
			stack: 1,
			hoverBackgroundColor: "rgba(255,99,132,0.4)",
			hoverBorderColor: "rgba(255,99,132,1)",
			data: [45, 79, 10, 41, 16, 85, 20],
		},
	],
};
