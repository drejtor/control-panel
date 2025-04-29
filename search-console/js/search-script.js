// search-script.js

// Load data from config.js
const accessToken = GSC_CONFIG.accessToken;
const propertyUri = GSC_CONFIG.propertyUri;

// Performance Chart (Dummy until real data available)
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

// Coverage Chart (Dummy for now)
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

// Dummy URL Inspection (will be real later)
function checkUrl() {
  const input = document.getElementById('urlInput').value;
  const resultDiv = document.getElementById('urlResult');
  if (input.trim() === "") {
    resultDiv.innerHTML = "<p>Please enter a URL.</p>";
  } else {
    resultDiv.innerHTML = `<p>URL <strong>${input}</strong> is <span style="color:green;">Indexed</span>.</p>`;
  }
}

// Future Fetch Real Data (Placeholder for later)
async function fetchRealPerformanceData() {
  try {
    const response = await fetch(`https://searchconsole.googleapis.com/v1/sites/${encodeURIComponent(propertyUri)}/searchAnalytics/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        startDate: "2024-01-01",
        endDate: "2024-01-07",
        dimensions: ["date"],
        rowLimit: 7
      })
    });
    const data = await response.json();

    // Example to update chart
    performanceChart.data.labels = data.rows.map(row => row.keys[0]);
    performanceChart.data.datasets[0].data = data.rows.map(row => row.clicks);
    performanceChart.data.datasets[1].data = data.rows.map(row => row.impressions);
    performanceChart.update();
    
  } catch (error) {
    console.error("Error fetching Search Console data:", error);
  }
}
