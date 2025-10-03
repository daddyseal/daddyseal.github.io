const AppData = {
     originalLabels : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
 originalDemandData : [12000, 13000, 12500, 14000, 13500, 15000],
 originalCapacityData: [11000, 11500, 12000, 12500, 13000, 13500],

// Clone for live chart use
currentLabels : [],
currentDemandData : [],
currentCapacityData : [],

gapChartConfig : {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      {
        label: 'Forecasted Demand',
        data: [],
        borderColor: '#ff6384',
        backgroundColor: 'rgba(255,99,132,0.2)',
        fill: true,
        tension: 0.3
      },
      {
        label: 'Available Capacity',
        data: [],
    Color: '#36a2eb',
        backgroundColor: 'rgba(54,162,235,0.2)',
        fill: true,
        tension: 0.3
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Monthly Demand vs. Capacity'
      },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    scales: {
      y: {
        beginAtZero: false
      }
    }
  },
},



}

// 2. Initialize the dynamic data
AppData.currentLabels = [...AppData.originalLabels];
AppData.currentDemandData = [...AppData.originalDemandData];
AppData.currentCapacityData = [...AppData.originalCapacityData];



// 2. IMPORTANT: Update the chart config data to point to the live arrays.
//    You can do this in your initDashboard() function for safety, 
//    or right here, *but only if* the chart is being initialized from the current data.
AppData.gapChartConfig.data.labels = AppData.currentLabels;
AppData.gapChartConfig.data.datasets[0].data = AppData.currentDemandData; 
AppData.gapChartConfig.data.datasets[1].data = AppData.currentCapacityData; 