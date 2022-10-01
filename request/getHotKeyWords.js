import { getBaseUrl } from '../utils/getBaseUrl.js';
export const getHotKeyWords = () => {
	return uni.request({
		url: `${ getBaseUrl() }/search/hot`,
		method: "GET"
	})
}
