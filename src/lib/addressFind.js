import { state, countries, cities, police_stations, post_offices } from "../assets/staticData/countryInfo";

export const getStatesByCountry = (country_name) => {
    const country_id = countries.find(item => item.name.toLowerCase() === country_name.toLowerCase())?.id

    return state.filter(s => s.country_id === country_id);
};

export const getCitiesByState = (state_name) => {
    const state_id = state.find(item => item.name.toLowerCase() === state_name.toLowerCase())?.id

    return cities.filter(c => c.state_id === state_id);
};

export const getPoliceStationsByCity = (city_name) => {
    const city_id = cities.find(item => item.name.toLowerCase() === city_name.toLowerCase())?.id

    return police_stations.filter(ps => ps.city_id === city_id);
};

export const getPostOfficeByPoliceStations = (police_station_name) => {
    const police_station_id = police_stations.find(item => item.name.toLowerCase() === police_station_name.toLowerCase())?.id

    return post_offices.filter(po => po.police_station_id === police_station_id);
};