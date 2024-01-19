export function sendMessage(buttonLabel) {
	if (window.location.origin.includes('doktornarabote')) {
		window.parent.postMessage({ buttonName: buttonLabel }, '*');
	}
}
