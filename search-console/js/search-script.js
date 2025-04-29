// Chart for Performance (Clicks and Impressions over 7 days)
const ctx = document.getElementById('performanceChart').getContext('2d');
const performanceChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Clicks',
      data: [120, 150, 180, 170, 200, 190, 210],
      borderColor: 'blue',
      fill: false
    },
    {
      label: 'Impressions',
      data: [1000, 1100, 1150, 1200, 1250, 1300, 1400],
      borderColor: 'green',
      fill: false
    }]
  }
});

// Chart for Coverage (Valid, Errors, Excluded)
const ctxCoverage = document.getElementById('coverageChart').getContext('2d');
const coverageChart = new Chart(ctxCoverage, {
  type: 'bar',
  data: {
    labels: ['Valid', 'Errors', 'Excluded'],
    datasets: [{
      label: 'Pages',
      data: [520, 5, 45],
      backgroundColor: ['#4caf50', '#f44336', '#ff9800']
    }]
  }
});

// Dummy URL Inspection
function checkUrl() {
  const input = document.getElementById('urlInput').value;
  const resultDiv = document.getElementById('urlResult');
  if (input.trim() === "") {
    resultDiv.innerHTML = "<p>Please enter a URL.</p>";
  } else {
    resultDiv.innerHTML = `<p>URL <strong>${input}</strong> is <span style="color:green;">Indexed</span>.</p>`;
  }
}

