export const showSuccessNotify = (notifyObj, message) => {
	notifyObj.show({
		type: "success",
		color: '#ffffff',
		message
	})
}

export const showWarningNotify = (notifyObj, message) => {
	notifyObj.show({
		type: "warning",
		color: '#ffffff',
		message
	})
}

export const showErrorNotify = (notifyObj, message) => {
	notifyObj.show({
		type: "error",
		color: '#ffffff',
		message
	})
}