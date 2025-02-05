


function showLoader() {
    let loader = document.getElementById("global-loader");
    if (loader) loader.style.display = "flex";
}

function hideLoader() {
    let loader = document.getElementById("global-loader");
    if (loader) loader.style.display = "none";
}
async function fetchData(endpoint, requestType, options = {}) {
    showLoader();
    try {
        const url = new URL(endpoint);
        url.searchParams.append("request_type", requestType);
        const response = await axios.get(url.toString(), options);
        return response.data;
    } catch (error) {
        console.error(`Could not fetch data from ${endpoint} with request_type ${requestType}:`, error);
        return null;
    }finally {
        hideLoader();
    }
}
const baseUrl="http://localhost:8000/statistics/";
async function fetchDashboardData() {
    showLoader();
    try {
        const countryStatistics = await fetchData(baseUrl, "country_statistics");
        const sectorStatistics = await fetchData(baseUrl, "sector_statistics");
        const regionStatistics = await fetchData(baseUrl, "region_statistics");
        const averageStatistics = await fetchData(baseUrl, "average_statistics");
        const overallData = await fetchData(baseUrl, "overall_data");

        return {
            countryStatistics: countryStatistics || [],
            sectorData: sectorStatistics || [],
            regionData: regionStatistics || [],
            totalData: averageStatistics?.msg?.total_data || 0,
            averageIntensity: averageStatistics?.msg?.avg_intensity || 0,
            averageLikelihood: averageStatistics?.msg?.avg_likelihood || 0,
            averageRelevance: averageStatistics?.msg?.avg_relevance || 0,
            overallData:overallData || [],

        };
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        return null;
    } finally {
        hideLoader();
    }
}


export { fetchData, fetchDashboardData,baseUrl ,showLoader,hideLoader}
