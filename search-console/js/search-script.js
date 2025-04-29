const accessToken = GSC_CONFIG.accessToken;
const propertyUri = GSC_CONFIG.propertyUri;

function refreshDashboardData() {
  console.log("Refreshing dashboard data...");
  document.getElementById('loadingSpinner').style.display = 'block';

  setTimeout(() => {
    document.getElementById('lastUpdated').innerText = `Last Updated: ${new Date().toLocaleString()}`;

    if (GSC_CONFIG.demoMode) {
      document.getElementById('clicksValue').innerText = '5,400';
      document.getElementById('impressionsValue').innerText = '89,000';
      document.getElementById('ctrValue').innerText = '6.1%';
      document.getElementById('positionValue').innerText = '14.2';

      document.getElementById('coverageList').innerHTML = `
        <li>520 Valid pages</li>
        <li>5 Errors (redirect error)</li>
        <li>45 Excluded (blocked by robots.txt)</li>
      `;

      document.getElementById('mobileUsabilityList').innerHTML = `
        <li>2 Mobile usability errors found</li>
        <li>Clickable elements too close together</li>
      `;

      document.getElementById('sitemapsTableBody').innerHTML = `
        <tr><td>https://yourdomain.com/sitemap.xml</td><td>Success</td></tr>
      `;

      document.getElementById('externalLinksTableBody').innerHTML = `
        <tr><td>example.com</td><td>56</td></tr>
        <tr><td>anotherdomain.com</td><td>34</td></tr>
      `;

      document.getElementById('internalLinksTableBody').innerHTML = `
        <tr><td>/about-us</td><td>20</td></tr>
        <tr><td>/contact</td><td>15</td></tr>
      `;

      document.getElementById('manualActions').innerHTML = `<span style="color: green;">No Manual Actions detected.</span>`;
      document.getElementById('securityIssues').innerHTML = `<span style="color: green;">No Security Issues found.</span>`;

      document.getElementById('demoBadge').style.display = 'inline-block';
      
    } else {
      fetchRealDataFromGSC();
      document.getElementById('demoBadge').style.display = 'none';
    }

    document.getElementById('loadingSpinner').style.display = 'none';
  }, 1000);
}

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

// Future: Real Data Fetching
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
    console.log(data); // Later: update dashboard with real data
  } catch (error) {
    console.error("Failed to fetch real GSC data:", error);
  }
}

// Auto-load dashboard on page load
window.onload = () => {
  refreshDashboardData();
};
const accessToken = GSC_CONFIG.accessToken;
const propertyUri = GSC_CONFIG.propertyUri;

function refreshDashboardData() {
  console.log("Refreshing dashboard data...");
  document.getElementById('loadingSpinner').style.display = 'block';

  setTimeout(() => {
    document.getElementById('lastUpdated').innerText = `Last Updated: ${new Date().toLocaleString()}`;

    if (GSC_CONFIG.demoMode) {
      document.getElementById('clicksValue').innerText = '5,400';
      document.getElementById('impressionsValue').innerText = '89,000';
      document.getElementById('ctrValue').innerText = '6.1%';
      document.getElementById('positionValue').innerText = '14.2';

      document.getElementById('coverageList').innerHTML = `
        <li>520 Valid pages</li>
        <li>5 Errors (redirect error)</li>
        <li>45 Excluded (blocked by robots.txt)</li>
      `;

      document.getElementById('mobileUsabilityList').innerHTML = `
        <li>2 Mobile usability errors found</li>
        <li>Clickable elements too close together</li>
      `;

      document.getElementById('sitemapsTableBody').innerHTML = `
        <tr><td>https://yourdomain.com/sitemap.xml</td><td>Success</td></tr>
      `;

      document.getElementById('externalLinksTableBody').innerHTML = `
        <tr><td>example.com</td><td>56</td></tr>
        <tr><td>anotherdomain.com</td><td>34</td></tr>
      `;

      document.getElementById('internalLinksTableBody').innerHTML = `
        <tr><td>/about-us</td><td>20</td></tr>
        <tr><td>/contact</td><td>15</td></tr>
      `;

      document.getElementById('manualActions').innerHTML = `<span style="color: green;">No Manual Actions detected.</span>`;
      document.getElementById('securityIssues').innerHTML = `<span style="color: green;">No Security Issues found.</span>`;

      document.getElementById('demoBadge').style.display = 'inline-block';
      
    } else {
      fetchRealDataFromGSC();
      document.getElementById('demoBadge').style.display = 'none';
    }

    document.getElementById('loadingSpinner').style.display = 'none';
  }, 1000);
}

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

// Future: Real Data Fetching
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
    console.log(data); // Later: update dashboard with real data
  } catch (error) {
    console.error("Failed to fetch real GSC data:", error);
  }
}

// Auto-load dashboard on page load
window.onload = () => {
  refreshDashboardData();
};
