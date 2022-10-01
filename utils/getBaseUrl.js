import { devHost, remoteHost, enviroment } from '../config/config.js';
export const getBaseUrl = () => {
	return enviroment === "develop" ? devHost : remoteHost
}