import axios from "axios";
import config from '../config.json';

const API_URL = config.api_url;
const SERVER_SUMMARY = '/api/server-data'
const PLAYERS_LIST = '/api/users'

export const fetchServerSummaryData = async () => {
    try {
        const response = await axios.get(API_URL + SERVER_SUMMARY)

        return response.data[0];
    } catch (e: any) {
        console.error(e.message)
    }
}

export const fetchPlayersListData = async () => {
    try {
        const response = await axios.get(API_URL + PLAYERS_LIST)

        return response.data;
    } catch (e: any) {
        console.error(e.message)
    }
}