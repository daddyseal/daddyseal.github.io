
const originalLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const originalDemandData = [12000, 13000, 12500, 14000, 13500, 15000];
const originalCapacityData = [11000, 11500, 12000, 12500, 13000, 13500];

// Clone for live chart use
let currentLabels = [...originalLabels];
let currentDemandData = [...originalDemandData];
let currentCapacityData = [...originalCapacityData];

function downloadResume() {
  alert("please visit my LinkedIn to view my resume. Thank you! https://www.linkedin.com/in/jeff-h-8a67026");
  // window.location.href = "assets/JeffreyOps_Resume.pdf";
}

function showScenario(type) {
  const base = document.getElementById("base-scenario");
  const high = document.getElementById("high-scenario");

  if (type === "base") {
    base.classList.remove("hidden");
    high.classList.add("hidden");
  } else {
    base.classList.add("hidden");
    high.classList.remove("hidden");
  }
}

function runGapAnalysis() {
  const demand = parseInt(document.getElementById("demand").value);
  const inventory = parseInt(document.getElementById("inventory").value);
  const capacity = parseInt(document.getElementById("capacity").value);
  const resultBox = document.getElementById("gap-result");

  if (isNaN(demand) || isNaN(inventory) || isNaN(capacity)) {
    resultBox.textContent = "Please enter valid numbers in all fields.";
    resultBox.style.background = "#ffeeba";
    return;
  }

  const totalSupply = inventory + capacity;
  const gap = totalSupply - demand;

  if (gap >= 0) {
    resultBox.textContent = `✅ Build supported. Surplus of ${gap} units.`;
    resultBox.style.background = "#d4edda";
  } else if (capacity >= demand) {
    resultBox.textContent = `⚠️ Build supported by capacity alone. Inventory not needed.`;
    resultBox.style.background = "#fff3cd";
  } else {
    resultBox.textContent = `❌ Build not supported. Shortfall of ${Math.abs(gap)} units.`;
    resultBox.style.background = "#f8d7da";
  }

  // Add next month label
  const nextMonth = getNextMonthLabel(currentLabels.length);
  currentLabels.push(nextMonth);
  currentDemandData.push(demand);
  currentCapacityData.push(capacity);  

  gapChart.data.labels = currentLabels;
  gapChart.data.datasets[0].data = currentDemandData;
  gapChart.data.datasets[1].data = currentCapacityData;
  gapChart.update();

}





const ctx = document.getElementById('gapChart').getContext('2d');

const gapChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: originalLabels,
    datasets: [
      {
        label: 'Forecasted Demand',
        data: originalDemandData,
        borderColor: '#ff6384',
        backgroundColor: 'rgba(255,99,132,0.2)',
        fill: true,
        tension: 0.3
      },
      {
        label: 'Available Capacity',
        data: originalCapacityData,
        borderColor: '#36a2eb',
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
  }
});

function getNextMonthLabel(index) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const startYear = 2025;
  const monthIndex = index % 12;
  const yearOffset = Math.floor(index / 12);
  return `${months[monthIndex]}/${startYear + yearOffset}`;
}

function resetChart() {
  // Reset internal chart arrays directly
  gapChart.data.labels = [...originalLabels];
  gapChart.data.datasets[0].data = [...originalDemandData];
  gapChart.data.datasets[1].data = [...originalCapacityData];
  gapChart.update();

  // Reset external tracking arrays too
  currentLabels = [...originalLabels];
  currentDemandData = [...originalDemandData];
  currentCapacityData = [...originalCapacityData];
}

