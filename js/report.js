import { fetchData, baseUrl, showLoader, hideLoader, fetchDashboardData } from "./api.js"

document.addEventListener("DOMContentLoaded", async () => {
  const sidebar = document.getElementById("sidebar")
  const sidebarCollapse = document.getElementById("sidebarCollapse")
  const content = document.getElementById("content")
  const tableBody = document.querySelector("#reportTable tbody")
  const columnToggleButtons = document.getElementById("columnToggleButtons")
  const pageSize = document.getElementById("pageSize")
  const prevPageBtn = document.getElementById("prevPage")
  const nextPageBtn = document.getElementById("nextPage")
  const pageNumberSpan = document.getElementById("pageNumber")
  const loader = document.getElementById("global-loader")

  let currentPage = 1
  let filteredData = []
  let itemsPerPage = Number.parseInt(pageSize.value)

  sidebarCollapse.addEventListener("click", () => {
    sidebar.classList.toggle("active")
    content.classList.toggle("active")
    sidebarCollapse.innerHTML = sidebar.classList.contains("active")
      ? '<i class="fas fa-bars"></i>'
      : '<i class="fas fa-times"></i>'
  })

  showLoader()

  try {
    const reportData = await fetchDashboardData()
    const data = reportData.overallData.msg || []
    filteredData = [...data]

    const columns = [
      { key: "serialNo", searchId: null, label: "S.No" },
      { key: "title", searchId: null, label: "Title" },
      { key: "topic__value", searchId: "searchTopic", label: "Topic" },
      { key: "sector__value", searchId: "searchSector", label: "Sector" },
      { key: "region__value", searchId: "searchRegion", label: "Region" },
      { key: "country__value", searchId: "searchCountry", label: "Country" },
      { key: "source__value", searchId: "searchSource", label: "Source" },
      { key: "pestle__value", searchId: "searchPestle", label: "PESTLE" },
      { key: "start__year", searchId: null, label: "Start Year" },
      { key: "end__year", searchId: "searchEndYear", label: "End Year" },
      { key: "added_date", searchId: null, label: "Added" },
      { key: "published_date", searchId: null, label: "Published" },
      { key: "intensity", searchId: null, label: "Intensity" },
      { key: "likelihood", searchId: null, label: "Likelihood" },
      { key: "relevance", searchId: null, label: "Relevance" },
      { key: "insight", searchId: null, label: "Insight" },
    ]

    columns.forEach((column) => {
      if (column.searchId) {
        const searchInput = document.getElementById(column.searchId)
        if (searchInput) {
          searchInput.addEventListener("input", () => {
            filterData()
          })
        }
      }
    })

    function filterData() {
      filteredData = data.filter((item) => {
        return columns.every((column) => {
          if (!column.searchId) return true

          const searchInput = document.getElementById(column.searchId)
          if (!searchInput || !searchInput.value) return true

          const itemValue = String(item[column.key] || "").toLowerCase()
          const searchValue = searchInput.value.toLowerCase()
          return itemValue.includes(searchValue)
        })
      })

      currentPage = 1
      updatePagination()
      populateTable()
    }

    function populateTable() {
      const startIndex = (currentPage - 1) * itemsPerPage
      const endIndex = startIndex + itemsPerPage
      const paginatedData = filteredData.slice(startIndex, endIndex)

      tableBody.innerHTML = "" 

      paginatedData.forEach((item, index) => {
        const row = document.createElement("tr")
        columns.forEach(({ key, label }) => {
          const cell = document.createElement("td")
          let value = item[key]

          if (key === "serialNo") {
            value = startIndex + index + 1
          } else if (key === "added_date" || key === "published_date") {
            value = value ? new Date(value).toLocaleDateString() : "-"
          }

          cell.textContent = value || "-"
          row.appendChild(cell)
        })
        tableBody.appendChild(row)
      })
    }

    function updatePagination() {
      const totalPages = Math.ceil(filteredData.length / itemsPerPage)
      pageNumberSpan.textContent = `${currentPage} / ${totalPages}`

      prevPageBtn.disabled = currentPage === 1
      nextPageBtn.disabled = currentPage >= totalPages
    }

    prevPageBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--
        populateTable()
        updatePagination()
      }
    })

    nextPageBtn.addEventListener("click", () => {
      const totalPages = Math.ceil(filteredData.length / itemsPerPage)
      if (currentPage < totalPages) {
        currentPage++
        populateTable()
        updatePagination()
      }
    })

    pageSize.addEventListener("change", () => {
      itemsPerPage = Number.parseInt(pageSize.value)
      currentPage = 1
      populateTable()
      updatePagination()
    })

    columns.forEach((col, index) => {
      const button = document.createElement("button")
      button.className = "btn btn-sm btn-toggle-column active"
      button.textContent = col.label
      button.style.backgroundColor = "#7367f0"
      button.style.color = "white"

      button.addEventListener("click", function () {
        const columnCells = document.querySelectorAll(
          `#reportTable tr td:nth-child(${index + 1}), #reportTable tr th:nth-child(${index + 1})`,
        )
        columnCells.forEach((cell) => {
          cell.style.display = cell.style.display === "none" ? "" : "none"
        })
        this.classList.toggle("active")
        this.style.backgroundColor = this.classList.contains("active") ? "#7367f0" : "#f8f9fa"
        this.style.color = this.classList.contains("active") ? "white" : "#000"
      })

      columnToggleButtons.appendChild(button)
    })

   
    populateTable()
    updatePagination()
  } catch (error) {
    console.error("Error fetching data:", error)
    tableBody.innerHTML = `<tr><td colspan="16" class="text-center">Error loading data</td></tr>`
  } finally {
   
    hideLoader()
  }
})

