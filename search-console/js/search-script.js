async function refreshDashboardData() {
  document.getElementById("loadingSpinner").style.display = "block";

  if (GSC_CONFIG.demoMode) {
    document.getElementById("demoBadge").style.display = "inline-block";
    document.getElementById("clicksValue").innerText = "1,234";
    document.getElementById("impressionsValue").innerText = "56,789";
    document.getElementById("ctrValue").innerText = "2.17%";
    document.getElementById("positionValue").innerText = "11.2";

    drawChart([100, 200, 150, 170, 130, 190, 220]);

    document.getElementById("loadingSpinner").style.display = "none";
    document.getElementById("lastUpdated").innerText = `Last Updated: ${new Date().toLocaleString()}`;
    return;
  }

  try {
    const tokenResponse = await fetch(GSC_CONFIG.backendUrl);
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    const response = await fetch(`https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(GSC_CONFIG.propertyUri)}/searchAnalytics/query`, {
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
    const rows = data.rows || [];

    const clicks = rows.reduce((sum, row) => sum + row.clicks, 0);
    const impressions = rows.reduce((sum, row) => sum + row.impressions, 0);
    const ctr = impressions > 0 ? (clicks / impressions * 100).toFixed(2) + "%" : "0%";

    document.getElementById("demoBadge").style.display = "none";
    document.getElementById("clicksValue").innerText = clicks;
    document.getElementById("impressionsValue").innerText = impressions;
    document.getElementById("ctrValue").innerText = ctr;
    document.getElementById("positionValue").innerText = "--";

    const clickSeries = rows.map(row => row.clicks);
    drawChart(clickSeries);

  } catch (err) {
    console.error("Failed to fetch real data:", err);
    alert("Error fetching real data. Falling back to demo.");
  } finally {
    document.getElementById("loadingSpinner").style.display = "none";
    document.getElementById("lastUpdated").innerText = `Last Updated: ${new Date().toLocaleString()}`;
  }
}

function drawChart(data) {
  const ctx = document.getElementById('performanceChart').getContext('2d');
  if (window.performanceChartInstance) {
    window.performanceChartInstance.destroy();
  }
  window.performanceChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [{
        label: 'Clicks',
        data: data,
        borderColor: 'blue',
        backgroundColor: 'lightblue',
        fill: false
      }]
    }
  });
}

window.onload = refreshDashboardData;
