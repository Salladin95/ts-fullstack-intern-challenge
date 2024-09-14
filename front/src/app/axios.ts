import axios from "axios"

/**
 * Core axios instance
 * */
const axiosInstance = axios.create({
	baseURL: "https://api.thecatapi.com/v1",
	timeout: 30000,

	headers: {
		"Content-Type": "application/json",
		"x-api-key": import.meta.env.VITE_API_KEY,
		Accept: "application/json",
		TimeZone: new Date().getTimezoneOffset() / -60,
	},
})

export default axiosInstance
