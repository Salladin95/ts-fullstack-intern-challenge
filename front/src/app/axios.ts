import axios from "axios"

/**
 * Core axios instance
 * */
const axiosInstance = axios.create({
	timeout: 30000,

	headers: {
		"Content-Type": "application/json",
		"x-api-key": "live_equhrIqCqOhgAt9owSrryRmuhECUtqUhwgoBZo9czR2vpZ7V2ZFe9Nc79zbmaanr",
		Accept: "application/json",
		TimeZone: new Date().getTimezoneOffset() / -60,
	},
})

export default axiosInstance
