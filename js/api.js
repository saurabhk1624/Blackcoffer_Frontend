
async function fetchData(endpoint, requestType, options = {}) {
    try {
        const url = new URL(endpoint);
        url.searchParams.append("request_type", requestType);
        const response = await axios.get(url.toString(), options);
        return response.data;
    } catch (error) {
        console.error(`Could not fetch data from ${endpoint} with request_type ${requestType}:`, error);
        return null;
    }
}

async function fetchDashboardData() {
    const baseEndpoint = "http://localhost:8000/statistics/";

    const countryStatistics = await fetchData(baseEndpoint, "country_statistics")
    const sectorStatistics = await fetchData(baseEndpoint, "sector_statistics")
    const regionStatistics = await fetchData(baseEndpoint, "region_statistics")

    return {
        countryStatistics: countryStatistics || [],
        sectorData: sectorStatistics || [] ,
        regionData: regionStatistics || [],
        totalSales: 15000,
        newCustomers: 120,
        conversionRate: 3.5,
        avgOrderValue: 125,
    };
}

export { fetchData, fetchDashboardData };
