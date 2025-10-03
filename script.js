

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
  const nextMonth = getNextMonthLabel(AppData.currentLabels.length);
  AppData.currentLabels.push(nextMonth);
  AppData.currentDemandData.push(demand);
  AppData.currentCapacityData.push(capacity);  

  gapChart.data.labels = AppData.currentLabels;
  gapChart.data.datasets[0].data = AppData.currentDemandData;
  gapChart.data.datasets[1].data = AppData.currentCapacityData;
  gapChart.update();

}



// Ensure gapChart is declared as 'let gapChart = null;' in your data.js or global scope

function initDashboard() {
    // 1. Check for the Canvas Element (Use the correct ID based on your HTML)
    const ctxElement = document.getElementById('gapGraph'); // Using 'gapGraph' based on your code

    if (!ctxElement) {
        console.error("Critical Error: 'gapGraph' canvas element not found.");
        return; // Stop execution if no canvas is found
    }
    
    // 2. SAFEGUARD: Destroy existing chart IF it's already initialized (for debugging)
    //    We check for IF it EXISTS, not IF it DOESN'T exist.
    if (window.gapChart) {
        console.warn("Destroying existing chart instance to prevent error.");
        window.gapChart.destroy(); 
        window.gapChart = null; // Clear the reference
    }
    
    // 3. INITIALIZATION: Create the new chart instance
    //    The check 'if (ctxElement)' above ensures the canvas exists.
    gapChart = new Chart(ctxElement.getContext('2d'), AppData.gapChartConfig);
    
    // 4. Global Access: Assign the working chart instance to window if needed
    //    Note: If gapChart is globally defined with 'let', this line is optional but harmless.
    window.gapChart = gapChart; 
}



// Ensure the initDashboard function runs after the page loads
document.addEventListener('DOMContentLoaded', initDashboard);

// You will also need to declare the gapChart variable globally for runGapAnalysis to access it
// OR simply use window.gapChart in runGapAnalysis if you adopt the `initDashboard` function.


function getNextMonthLabel(index) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const startYear = 2025;
  const monthIndex = index % 12;
  const yearOffset = Math.floor(index / 12);
  return `${months[monthIndex]}/${startYear + yearOffset}`;
}

function resetChart() {
  // Reset internal chart arrays directly
  gapChart.data.labels = AppData.originalLabels;
  gapChart.data.datasets[0].data = AppData.originalDemandData;
  gapChart.data.datasets[1].data = AppData.originalCapacityData;
  gapChart.update();


}

