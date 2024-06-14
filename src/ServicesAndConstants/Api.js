import CONFIG_CONSTANTS from "./Config";
const fetchWeatherData = async (api) => {
    try {
        const response = await fetch(api);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Erreur de récupération des données:", error);
        throw error;
    }
};

const buildWeatherApiUrl = (city, days) => {
    return `${CONFIG_CONSTANTS.WeatherApi}?key=${CONFIG_CONSTANTS.WeatherApiKey}&q=${city}${days ? `&days=${days}` : ''}`;
};

export const getWeatherByCity = async (city, days) => {
    const api = buildWeatherApiUrl(city, days);
    console.log(api);
    const weather = await fetchWeatherData(api);
    console.log(weather)
    return weather;
};



