import { resolutionCheck } from './_functions';

export const onResize = () => {
	if (window.location.origin.includes('localhost')) {
		console.log('localhost');
	} else {
		window.addEventListener('resize', () => {
			window.location.reload();
		});
	}

	if (
		resolutionCheck.resolution === 'bigTabletLand' ||
		resolutionCheck.resolution === 'middleTabletLand' ||
		resolutionCheck.resolution === 'bigPhoneLand' ||
		resolutionCheck.resolution === 'middlePhoneLand' ||
		resolutionCheck.resolution === 'smallPhoneLand'
	) {
		document.querySelector('body').classList.add('pleaseRotate');
	} else {
		document.querySelector('body').classList.remove('pleaseRotate');
	}
};
