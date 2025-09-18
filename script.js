function downloadResume() {
  alert("This would trigger a résumé download. Link your PDF here.");
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
}
