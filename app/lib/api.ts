import axios from "axios";
import config from '../../config.json'

// const API_URL = 'https://stats.ocsq.ru'; //prod
export const API_URL = config.api_url;
export const SERVER_SUMMARY = '/api/server-data'
export const PLAYERS_LIST = '/api/users/list'
export const LAST_KILLS = '/api/users/last-kills'
export const TOP_PLAYERS = '/api/users/top-players'
export const PLAYER_DETAILS = '/api/user/'


export const fetchServerSummaryData = async () => {
    try {
        const response = await axios.get(API_URL + SERVER_SUMMARY)

        return response.data;
    } catch (e: any) {
        console.error(e.message)
        return null
    }
}

export const fetchLastKillsData = async () => {
    try {
        const response = await axios.get(API_URL + LAST_KILLS)

        return response.data;
    } catch (e: any) {
        console.error(e.message)
        return null
    }
}

export const fetchTopPlayersData = async () => {
    try {
        const response = await axios.get(API_URL + TOP_PLAYERS)

        return response.data;
    } catch (e: any) {
        console.error(e.message)
        return null
    }
}

export const fetchListPlayersData = async () => {
    try {
        const response = await axios.get(API_URL + PLAYERS_LIST)

        return response.data;
    } catch (e: any) {
        console.error(e.message)
        return null
    }
}

export const fetchPlayerDetailsData = async (steamid: string) => {
    try {
        const response = await axios.get(API_URL + PLAYER_DETAILS + steamid)

        return response.data;
    } catch (e: any) {
        console.error(e.message)
        return null
    }
}

