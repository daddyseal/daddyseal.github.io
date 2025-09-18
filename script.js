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
