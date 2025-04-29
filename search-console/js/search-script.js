// Load credentials
const accessToken = GSC_CONFIG.accessToken;
const propertyUri = GSC_CONFIG.propertyUri;

// Dummy setup (will fetch real later)
document.getElementById('lastUpdated').innerText = `Last Updated: ${new Date().toLocaleString()}`;

// Dummy values
document.getElementById('clicksValue').innerText = '5,400';
document.getElementById('impressionsValue').innerText = '89,000';
document.getElementById('ctrValue').innerText = '6.1%';
document.getElementById('positionValue').innerText = '14.2';

// Dummy Performance Chart
const ctx = document.getElementById('performanceChart').getContext('2d');
const performanceChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      { label: 'Clicks', data: [120, 150, 180, 170, 200, 190, 210], borderColor: 'blue', fill: false },
      { label: 'Impressions', data: [1000, 1100, 1150, 1200, 1250, 1300, 1400], borderColor: 'green', fill: false }
    ]
  }
});

// Dummy Coverage Chart
const ctxCoverage = document.getElementById('coverageChart').getContext('2d');
const coverageChart = new Chart(ctxCoverage, {
  type: 'bar',
  data: {
    labels: ['Valid', 'Errors', 'Excluded'],
    datasets: [{ label: 'Pages', data: [520, 5, 45], backgroundColor: ['#4caf50', '#f44336', '#ff9800'] }]
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

// Future: Fetch real data from GSC APIs
async function fetchRealDataFromGSC() {
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
    console.log(data); // Handle updating charts with real data
  } catch (error) {
    console.error("Failed to fetch real GSC data:", error);
  }
}
