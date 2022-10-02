export const verifyIsLogin = () => {
	const session = uni.getStorageSync('session');
	const token = uni.getStorageSync('token');
	const userInfo = uni.getStorageSync('userInfo');
	return (session && token && userInfo) ? true : false
}