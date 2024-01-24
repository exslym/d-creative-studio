const w = window;
const d = document.documentElement;
const b = document.body;
const st = 'scrollTop';
const sh = 'scrollHeight';
const x = w.innerWidth || d.clientWidth || b.clientWidth;
const y = w.innerHeight || d.clientHeight || b.clientHeight;
const aspectRatio = x / y;

const isMobileDevice =
	/Android|webOS|Macintosh|Mac|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		navigator.userAgent
	);
// const isMobileDevice =
// 	/Android|webOS|Macintosh|Mac|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
// 		navigator.userAgent
// 	) && navigator.maxTouchPoints > 1;

//* Device resolutions check
class Resolutions {
	constructor() {
		if (navigator.maxTouchPoints < 1) {
			if (x > 1280 && x <= 1440 && aspectRatio > 1) {
				// screen width: 1280 - 1440
				this.resolution = 'desktopMiddle';
			} else if (x > 1024 && x <= 1280 && aspectRatio > 1) {
				// screen width: 1024 - 1280
				this.resolution = 'desktopSmall';
			} else {
				// desktop
				this.resolution = 'desktop';
			}
		} else {
			if (isMobileDevice && x > 1180 && x <= 1368 && aspectRatio > 1) {
				// 1368 * 1024
				this.resolution = 'bigTabletLand';
			} else if (isMobileDevice && x > 932 && x <= 1180 && aspectRatio > 1) {
				// 1180 * 820
				this.resolution = 'middleTabletLand';
			} else if (isMobileDevice && x > 896 && x <= 932 && aspectRatio > 1) {
				// 932 * 430
				this.resolution = 'bigPhoneLand';
			} else if (isMobileDevice && x > 740 && x <= 896 && aspectRatio > 1) {
				// 896 * 414
				this.resolution = 'middlePhoneLand';
			} else if (isMobileDevice && x <= 740 && aspectRatio > 1) {
				// 740 * 375
				this.resolution = 'smallPhoneLand';
			} else if (isMobileDevice && x > 820 && x <= 1024 && aspectRatio <= 1) {
				// 1024 * 1368
				this.resolution = 'bigTabletVert';
			} else if (isMobileDevice && x > 768 && x <= 820 && aspectRatio <= 1) {
				// 820 * 1180
				this.resolution = 'middleTabletVert';
			} else if (isMobileDevice && x > 430 && x <= 768 && aspectRatio <= 1) {
				// 768 * 1024
				this.resolution = 'smallTabletVert';
			} else if (isMobileDevice && x > 414 && x <= 430 && aspectRatio <= 1) {
				// 430 * 932
				this.resolution = 'bigPhoneVert';
			} else if (isMobileDevice && x > 375 && x <= 414 && aspectRatio <= 1) {
				// 414 * 896
				this.resolution = 'middlePhoneVert';
			} else if (isMobileDevice && x <= 375 && aspectRatio <= 1) {
				// 375 * 896 || 360 *
				this.resolution = 'smallPhoneVert';
			}
		}

		// if (!isMobileDevice && x > 1280 && x <= 1440 && aspectRatio > 1) {
		// 	// screen width: 1280 - 1440
		// 	this.resolution = 'desktopMiddle';
		// } else if (!isMobileDevice && x > 1024 && x <= 1280 && aspectRatio > 1) {
		// 	// screen width: 1024 - 1280
		// 	this.resolution = 'desktopSmall';
		// } else if (isMobileDevice && x > 1180 && x <= 1368 && aspectRatio > 1) {
		// 	// 1368 * 1024
		// 	this.resolution = 'bigTabletLand';
		// } else if (isMobileDevice && x > 932 && x <= 1180 && aspectRatio > 1) {
		// 	// 1180 * 820
		// 	this.resolution = 'middleTabletLand';
		// } else if (isMobileDevice && x > 896 && x <= 932 && aspectRatio > 1) {
		// 	// 932 * 430
		// 	this.resolution = 'bigPhoneLand';
		// } else if (isMobileDevice && x > 740 && x <= 896 && aspectRatio > 1) {
		// 	// 896 * 414
		// 	this.resolution = 'middlePhoneLand';
		// } else if (isMobileDevice && x <= 740 && aspectRatio > 1) {
		// 	// 740 * 375
		// 	this.resolution = 'smallPhoneLand';
		// } else if (isMobileDevice && x > 820 && x <= 1024 && aspectRatio <= 1) {
		// 	// 1024 * 1368
		// 	this.resolution = 'bigTabletVert';
		// } else if (isMobileDevice && x > 768 && x <= 820 && aspectRatio <= 1) {
		// 	// 820 * 1180
		// 	this.resolution = 'middleTabletVert';
		// } else if (isMobileDevice && x > 430 && x <= 768 && aspectRatio <= 1) {
		// 	// 768 * 1024
		// 	this.resolution = 'smallTabletVert';
		// } else if (isMobileDevice && x > 414 && x <= 430 && aspectRatio <= 1) {
		// 	// 430 * 932
		// 	this.resolution = 'bigPhoneVert';
		// } else if (isMobileDevice && x > 375 && x <= 414 && aspectRatio <= 1) {
		// 	// 414 * 896
		// 	this.resolution = 'middlePhoneVert';
		// } else if (isMobileDevice && x <= 375 && aspectRatio <= 1) {
		// 	// 375 * 896 || 360 *
		// 	this.resolution = 'smallPhoneVert';
		// } else {
		// 	// desktop
		// 	this.resolution = 'desktop';
		// }

		console.log(this.resolution);
	}
}
export const resolutionCheck = new Resolutions();

//* ANIMATION FUNCTIONS:
export const headerAnimation = (
	scrolledParent,
	speed1,
	speed2,
	element1,
	element2
) => {
	if (scrolledParent < 340) {
		element1.style.transform = `translateY(${-1 * scrolledParent * speed1}px)`;
		element2.style.transform = `scale(${1 / (1 + scrolledParent * speed2)})`;
		element2.classList.remove('anchor');
		element2.style.pointerEvents = 'none';
	} else {
		element1.style.transform = `translateY(-116px)`;
		element2.style.transform = `scale(0.1155)`;
		element2.classList.add('anchor');
		element2.style.pointerEvents = 'auto';
	}
};

//* HEADER LOGO CLICK TO SCROLL TOP:
export const headerLogoButton = logoButton => {
	if (document.querySelector(`.${logoButton}`)) {
		const button = document.querySelector(`.${logoButton}`);
		button.addEventListener('click', e => {
			e.preventDefault();
			if (button.classList.contains('anchor')) {
				const targetElement = button.dataset.target;
				const scrollTarget = document.querySelector(`#${targetElement}`);
				const elementPosition = scrollTarget.getBoundingClientRect().top;
				window.scrollBy({
					top: elementPosition,
					behavior: 'smooth',
				});
			}
		});
	}
};

export const calcButtonAnimation = (
	scrolledParent,
	animationPoint,
	degree,
	speed,
	element
) => {
	if (scrolledParent > animationPoint) {
		if (degree < 180) {
			element.style.transform = `rotate(${degree * speed}deg)`;
		} else {
			element.style.transform = `rotate(180deg)`;
		}
	} else {
		element.style.transform = `rotate(0deg)`;
	}
};

export const calcOrangeButtonAnimation = (element, scrolledPercent, speed) => {
	element.style.transform = `translateY(${scrolledPercent * speed}px)`;
};

export const teamHeaderAnimation = (
	scrolledParent,
	scrolledBodyPercent,
	animationPoint,
	speed,
	ratio1,
	ratio2,
	asteriks,
	header
) => {
	if (scrolledParent > animationPoint) {
		asteriks.style.transform = `rotate(${-scrolledBodyPercent * speed}deg)`;
		header.style.opacity = 1;
		header.style.transform = `translateX(${
			ratio2 - scrolledParent * ratio1
		}px)`;
	}
};

export const creativeHeaderAnimation = (
	scrolledParent,
	scrolledBodyPercent,
	animationPoint,
	speed,
	ratio1,
	ratio2,
	asteriks,
	header
) => {
	if (scrolledParent > animationPoint) {
		asteriks.style.transform = `rotate(${-scrolledBodyPercent * speed}deg)`;
		header.style.opacity = 1;
		header.style.transform = `translateX(${
			ratio2 - scrolledParent * ratio1
		}px)`;
	}
};

export const teamBoxAnimation = (
	row1,
	row2,
	row3,
	row4,
	row5,
	wrapper,
	scrolledParent,
	speed1,
	speed2,
	speed3,
	start1,
	start2,
	start3,
	start4,
	start5
) => {
	switch (true) {
		case wrapper.classList.contains('medEditorsWrapper'):
			row1.style.transform = `translateX(${
				-1 * scrolledParent * speed1 + start1
			}px)`;
			row2.style.transform = `translateX(${
				1 * scrolledParent * speed2 + start2
			}px)`;
			row3.style.transform = `translateX(${
				-1 * scrolledParent * speed2 + start3
			}px)`;
			row4.style.transform = `translateX(${
				1 * scrolledParent * speed1 + start4
			}px)`;
			row5.style.transform = `translateX(${
				-1 * scrolledParent * speed3 + start5
			}px)`;
			break;
		case wrapper.classList.contains('designersWrapper'):
			row1.style.transform = `translateX(${
				-1 * scrolledParent * speed2 + start1
			}px)`;
			row2.style.transform = `translateX(${
				1 * scrolledParent * speed1 + start2
			}px)`;
			row3.style.transform = `translateX(${
				-1 * scrolledParent * speed3 + start3
			}px)`;
			row4.style.transform = `translateX(${
				1 * scrolledParent * speed3 + start4
			}px)`;
			row5.style.transform = `translateX(${
				-1 * scrolledParent * speed1 + start5
			}px)`;
			break;
		case wrapper.classList.contains('developersWrapper'):
			row1.style.transform = `translateX(${
				-1 * scrolledParent * speed2 + start1
			}px)`;
			row2.style.transform = `translateX(${
				1 * scrolledParent * speed1 + start2
			}px)`;
			row3.style.transform = `translateX(${
				-1 * scrolledParent * speed3 + start3
			}px)`;
			row4.style.transform = `translateX(${
				1 * scrolledParent * speed3 + start4
			}px)`;
			row5.style.transform = `translateX(${
				-1 * scrolledParent * speed1 + start5
			}px)`;
			break;
		case wrapper.classList.contains('videographersWrapper'):
			row1.style.transform = `translateX(${
				-1 * scrolledParent * speed2 + start1
			}px)`;
			row2.style.transform = `translateX(${
				1 * scrolledParent * speed1 + start2
			}px)`;
			row3.style.transform = `translateX(${
				-1 * scrolledParent * speed3 + start3
			}px)`;
			row4.style.transform = `translateX(${
				1 * scrolledParent * speed3 + start4
			}px)`;
			row5.style.transform = `translateX(${
				-1 * scrolledParent * speed1 + start5
			}px)`;
			break;
	}
};

//* SERVICE BOXES ANIMATION:
export const serviceBoxAnimation = (
	scrolledParent,
	boxParent,
	animationPoint,
	translation,
	speed,
	element
) => {
	if (scrolledParent > animationPoint) {
		element.style.opacity = 1;

		if (translation > 0) {
			element.style.transform = `translateY(${translation}px)`;
		} else {
			element.style.transform = `translateY(0px)`;
			if (
				scrolledParent > d.clientHeight - boxParent[sh] ||
				scrolledParent > b.clientHeight - boxParent[sh]
			) {
				if (
					Math.abs(d.clientHeight - (scrolledParent + boxParent[sh])) >
					boxParent[sh]
				) {
					element.style.transform = `translateY(${-element[sh]}px)`;
				} else {
					element.style.transform = `translateY(${
						(d.clientHeight - (scrolledParent + boxParent[sh])) * speed
					}px)`;
				}
			}
		}
	} else {
		element.style.transform = `translateY(${element[sh]}px)`;
	}
};

//* SERVICE BOXES START POSITIONS ON RELOAD:
export const positionOnReload = (parentBox, element) => {
	setTimeout(() => {
		if (parentBox.getBoundingClientRect().y > 0) {
			if (
				parentBox.getBoundingClientRect().y > (d.clientHeight || b.clientHeight)
			) {
				element.style.transform = `translateY(${element[sh]}px)`;
			} else {
				element.style.transform = `translateY(0px)`;
			}
		} else {
			element.style.transform = `translateY(${-element[sh]}px)`;
		}
		clearTimeout();
	}, 100);
};

//* FOOTER:
export const orderButtonAnimation = (
	scrolledParent,
	animationPoint,
	degree,
	element
) => {
	if (scrolledParent > animationPoint) {
		element.forEach(el => {
			if (degree < 180) {
				el.style.transform = `rotate(${degree}deg)`;
			} else {
				el.style.transform = `rotate(180deg)`;
			}
		});
	} else {
		element.forEach(el => {
			el.style.transform = `rotate(0deg)`;
		});
	}
};

export const setOrderButton = (round, button) => {
	round.forEach(el => {
		el.classList.add('sending');
		el.classList.add('sendingBackground');
	});
	button.forEach(el => {
		el.disabled = true;
		el.style.pointerEvents = 'none';
	});
};

export const resetOrderButton = (round, button) => {
	round.forEach(el => {
		el.classList.remove('sending');
		el.classList.remove('sendingBackground');
	});
	button.forEach(el => {
		el.disabled = false;
		el.style.pointerEvents = 'auto';
	});
};

export const clearForm = (userField, emailField, phoneField) => {
	userField.value = '';
	emailField.value = '';
	phoneField.value = '';

	userField.placeholder = 'название компании / имя';
	userField.classList.remove('error');

	emailField.classList.remove('error');
	emailField.classList.remove('errorFontSize');
	emailField.placeholder = 'email@domen.com';

	phoneField.classList.remove('error');
	phoneField.classList.remove('errorFontSize');
	phoneField.placeholder = '(999) 999-99-99';
};
