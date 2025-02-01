document.addEventListener("DOMContentLoaded", () => {
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

  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales",
        data: [12, 19, 3, 5, 2, 3],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  }

  const trafficData = {
    labels: ["Direct", "Organic", "Referral", "Social"],
    datasets: [
      {
        data: [30, 50, 15, 5],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  }

  new Chart(document.getElementById("salesChart"), {
    type: "line",
    data: salesData,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Monthly Sales",
        },
      },
    },
  })

  new Chart(document.getElementById("trafficChart"), {
    type: "doughnut",
    data: trafficData,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Traffic Sources",
        },
      },
    },
  })

  // Update data cards
  document.getElementById("totalSales").textContent = "$15,000"
  document.getElementById("newCustomers").textContent = "120"
  document.getElementById("conversionRate").textContent = "3.5%"
  document.getElementById("avgOrderValue").textContent = "$125"
})

