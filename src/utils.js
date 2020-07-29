export const isNotificationAllowed = Notification.requestPermission(function(result) {
	if (result === "granted") {
		return true;
	}
	alert("Please allow notications to enable reminder feature");
	return false;
});

export function displayNotification(title) {
	navigator.serviceWorker.ready.then(registration => {
		registration.showNotification("Todo App", {
			body: `Reminder for ${title}`,
			vibrate: [100, 100, 100],
			icon: './img/logo.png'
		});
	});
};

export function createTimer(dateTime) {
	const now = new Date();
	return {
		isFutureDateTime : dateTime > now,
		duration: dateTime - now
	}
};

export function capitalizeString(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}