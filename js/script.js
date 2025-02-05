import { fetchDashboardData } from "./api.js"

document.addEventListener("DOMContentLoaded", async () => {
  const sidebar = document.getElementById("sidebar")
  const sidebarCollapse = document.getElementById("sidebarCollapse")
  const content = document.getElementById("content")

  sidebarCollapse.addEventListener("click", () => {
    sidebar.classList.toggle("active")
    content.classList.toggle("active")
    if (sidebar.classList.contains("active")) {
      sidebarCollapse.innerHTML = '<i class="fas fa-bars"></i>'
    } else {
      sidebarCollapse.innerHTML = '<i class="fas fa-times"></i>'
    }
  })

  const dashboardData = await fetchDashboardData()

  if (
    dashboardData.sectorData &&
    dashboardData.sectorData.msg &&
    dashboardData.sectorData.msg.length > 0
  ) {
    const sectorData = {
      labels: dashboardData.sectorData.msg.map((item) => item.sector__value),
      datasets: [
        {
          label: "Count",
          data: dashboardData.sectorData.msg.map((item) => item.count),
          backgroundColor: "#ff9f40",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    }

  new Chart(document.getElementById("sectorChart"), {
    type: "line",
    data: sectorData,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Sector Distribution",
        },
      },
    },
  })
}else {
  console.error("No sector statistics data available")
  document.getElementById("sectorChart").innerHTML = "No data available"
}
if (dashboardData.regionData && dashboardData.regionData.msg && dashboardData.regionData.msg.length > 0) {
  const regionData = {
    labels: dashboardData.regionData.msg.map((item) => item.region__value),
    datasets: [
      {
        data: dashboardData.regionData.msg.map((item) => item.count),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
        ],
      },
    ],
  }

  new Chart(document.getElementById("regionChart"), {
    type: "doughnut",
    data: regionData,
    options: {
      responsive: true,
      aspectRatio: 1,
      plugins: {
        title: {
          display: true,
          text: "Region Distribution",
        },
        legend: {
          position: "bottom",
        },
      },
    },
  })
} else {
  console.error("No region data available")
  document.getElementById("regionChart").innerHTML = "No data available"
}

  if (
    dashboardData.countryStatistics &&
    dashboardData.countryStatistics.msg &&
    dashboardData.countryStatistics.msg.length > 0
  ) {
    const countryData = {
      labels: dashboardData.countryStatistics.msg.map((item) => item.country__value),
      datasets: [
        {
          label: "Count",
          data: dashboardData.countryStatistics.msg.map((item) => item.count),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    }

    new Chart(document.getElementById("countryChart"), {
      type: "bar",
      data: countryData,
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Country Statistics",
          },
          legend: {
            display: false, 
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Count",
            },
          },
          x: {
            title: {
              display: true,
              text: "Country",
            },
          },
        },
      },
    })
  } else {
    console.error("No country statistics data available")
    document.getElementById("countryChart").innerHTML = "No data available"
  }

  document.getElementById("totalData").textContent = dashboardData.totalData
  document.getElementById("averageIntensity").textContent = dashboardData.averageIntensity
  document.getElementById("averageLikelihood").textContent = dashboardData.averageLikelihood
  document.getElementById("averageRelevance").textContent = dashboardData.averageRelevance
})

