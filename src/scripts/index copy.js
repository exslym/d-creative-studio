import '../styles/index.scss';

if (process.env.NODE_ENV === 'development') {
	require('../index.html');
}

// принудительное обновление страницы при ресайзе окна браузера, чтоб не было глюков
// window.addEventListener('resize', function () {
// 	'use strict';
// 	window.location.reload();
// });

//принудительное обновление страницы при ресайзе окна браузера, чтоб не было глюков (jQuery)
// jQuery(function ($) {
// 	var windowWidth = $(window).width();
// 	var windowHeight = $(window).height();

// 	$(window).resize(function () {
// 		if (windowWidth != $(window).width() || windowHeight != $(window).height()) {
// 			location.reload();
// 			return;
// 		}
// 	});
// });

window.addEventListener('DOMContentLoaded', function () {
	'use strict';

	//принудительное обновление страницы при ресайзе окна браузера, чтоб не было глюков (jQuery)
	jQuery(function ($) {
		var windowWidth = $(window).width();

		$(window).resize(function () {
			if (windowWidth != $(window).width()) {
				location.reload();
				return;
			}
		});
	});

	//плавное раскрытие списков:
	let expandButton = document.querySelectorAll('.expand_btn'),
		expandableBox = document.querySelectorAll('.expandable_box'),
		expandableTitle = document.querySelectorAll('.expandable_title'),
		expandAction = document.querySelectorAll('.expand_btn_icon');

	//закрытие другого открытого списка при открытии текущего:
	for (let i = 0; i < expandButton.length; i++) {
		expandButton[i].addEventListener('click', e => {
			e.preventDefault();

			if (
				expandableBox[i].style.maxHeight &&
				expandableTitle[i].style.maxHeight
			) {
				expandableBox[i].style.maxHeight = null;
				expandableTitle[i].style.maxHeight = null;
				expandAction[i].classList.remove('pinch');
			} else {
				for (let j = 0; j < expandButton.length; j++) {
					expandableBox[j].style.maxHeight = null;
					expandableTitle[j].style.maxHeight = null;
					expandAction[j].classList.remove('pinch');
				}
				expandableBox[i].style.maxHeight =
					expandableBox[i].scrollHeight + 'px';
				expandableTitle[i].style.maxHeight =
					expandableBox[i].scrollHeight + 'px';
				expandAction[i].classList.add('pinch');
			}
		});
	}

	//плавное раскрытие меню:
	let burger = document.querySelector('#burger'),
		menu = document.querySelector('#menu'),
		main = document.querySelector('.main'),
		footer = document.querySelector('.footer');

	burger.addEventListener('click', e => {
		e.preventDefault();

		if (e.target.classList.contains('tap-to-open')) {
			burger.classList.remove('tap-to-open');
			burger.classList.add('tap-to-close');

			burger.classList.add('open-menu');
			burger.classList.remove('close-menu');
			menu.classList.add('open-menu');
			menu.classList.remove('close-menu');
			document.body.classList.add('overflow-hidden');
			main.classList.add('non-visible');
			footer.classList.add('non-visible');
		} else if (e.target.classList.contains('tap-to-close')) {
			burger.classList.remove('tap-to-close');
			burger.classList.add('tap-to-open');

			burger.classList.remove('open-menu');
			burger.classList.add('close-menu');
			menu.classList.remove('open-menu');
			menu.classList.add('close-menu');
			document.body.classList.remove('overflow-hidden');
			main.classList.remove('non-visible');
			footer.classList.remove('non-visible');
		}
	});

	//TEXT & ASTERIKS ANIMATION ON SCROLL:
	let runTeam = document.querySelector('#run_team'),
		runCreative = document.querySelector('#run_creative'),
		runLogoBox = document.querySelector('#logo_box'),
		runLogoImg = document.querySelector('#logo_img'),
		runAsteriks1 = document.querySelector('#run_asteriks1'),
		runAsteriks2 = document.querySelector('#run_asteriks2'),
		runBox1T = document.querySelector('#run_box1_t'),
		runBox1D = document.querySelector('#run_box1_d'),
		runBox2 = document.querySelector('#run_box2'),
		runBox3I1 = document.querySelector('#run_box3_item1'),
		runBox3I2 = document.querySelector('#run_box3_item2'),
		runBox3I3 = document.querySelector('#run_box3_item3'),
		marquee = document.querySelectorAll('.marquee'),
		marqueeReverse = document.querySelectorAll('.marquee_reverse');

	const h = document.documentElement,
		b = document.body,
		st = 'scrollTop',
		sh = 'scrollHeight';

	//Зависимость от ширины экрана, менее 1000px выполняется перерасчет анимации:
	let w = window,
		d = document,
		e = d.documentElement,
		g = d.getElementsByTagName('body')[0],
		x = w.innerWidth || e.clientWidth || g.clientWidth,
		y = w.innerHeight || e.clientHeight || g.clientHeight;

	//DESKTOP:
	//
	if (x > 1024) {
		//CURSOR:
		$(document).on('mousemove', function (e) {
			$('#customCursor').css({
				left: e.clientX,
				top: e.clientY,
			});
		});

		$(window).on('scroll', function (e) {
			$('#customCursor').css({
				left: e.clientX,
				top: e.clientY,
			});
		});

		// Run HEADER LOGO:
		document.addEventListener('scroll', () => {
			let percent =
					((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) *
					100,
				translateY = percent * 20,
				scaleX = 1 / (1 + percent * 1.3);

			if (translateY < 116) {
				runLogoBox.style.transform = `translateY(${-translateY}px)`;
				runLogoImg.style.transform = `scale(${scaleX})`;
			} else {
				runLogoBox.style.transform = `translateY(-116px)`;
				runLogoImg.style.transform = `scale(0.1155)`;
			}
		});

		// Run "НАША КОМАНДА" + *:
		document.addEventListener('scroll', () => {
			let percent =
				((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
			runTeam.style.transform = `translateX(${-percent * 200 + 3600}px)`;
		});
		document.addEventListener('scroll', () => {
			let percent =
				((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
			runAsteriks1.style.transform = `rotate(${-percent * 60}deg)`;
		});

		// Run "Креативный продакшен" + *:
		document.addEventListener('scroll', () => {
			let percent =
				((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
			runCreative.style.transform = `translateX(${
				-percent * 220 + 16000
			}px)`;
		});
		document.addEventListener('scroll', () => {
			let percent =
				((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
			runAsteriks2.style.transform = `rotate(${-percent * 60}deg)`;
		});

		// Run marquee text in "Контентмейкеры", "Дизайнеры", "Разработчики", "Видеографы":
		document.addEventListener('scroll', () => {
			let percent =
				((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
			//"Контентмейкеры"
			marquee[0].style.transform = `translateX(${
				-percent * 80 * 1 + 2000
			}px)`;
			marquee[1].style.transform = `translateX(${
				-percent * 80 * 0.8 + 2000
			}px)`;
			marquee[2].style.transform = `translateX(${
				-percent * 80 * 0.6 + 1500
			}px)`;
			//"Дизайнеры"
			marquee[3].style.transform = `translateX(${
				-percent * 80 * 1 + 2400
			}px)`;
			marquee[4].style.transform = `translateX(${
				-percent * 80 * 0.8 + 1600
			}px)`;
			marquee[5].style.transform = `translateX(${
				-percent * 80 * 0.6 + 1200
			}px)`;
			//"Разработчики"
			marquee[6].style.transform = `translateX(${
				-percent * 80 * 1 + 3100
			}px)`;
			marquee[7].style.transform = `translateX(${
				-percent * 80 * 0.8 + 2300
			}px)`;
			marquee[8].style.transform = `translateX(${
				-percent * 80 * 0.6 + 2300
			}px)`;
			//"Видеографы"
			marquee[9].style.transform = `translateX(${
				-percent * 80 * 1 + 2400
			}px)`;
			marquee[10].style.transform = `translateX(${
				-percent * 80 * 0.8 + 1500
			}px)`;
			marquee[11].style.transform = `translateX(${
				-percent * 80 * 0.6 + 1200
			}px)`;
		});
		document.addEventListener('scroll', () => {
			let percent =
				((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
			//"Контентмейкеры"
			marqueeReverse[0].style.transform = `translateX(${
				percent * 80 * 0.6 - 1500
			}px)`;
			marqueeReverse[1].style.transform = `translateX(${
				percent * 80 * 0.8 - 2000
			}px)`;
			//"Дизайнеры"
			marqueeReverse[2].style.transform = `translateX(${
				percent * 80 * 0.6 - 1800
			}px)`;
			marqueeReverse[3].style.transform = `translateX(${
				percent * 80 * 0.8 - 2500
			}px)`;
			//"Разработчики"
			marqueeReverse[4].style.transform = `translateX(${
				percent * 80 * 0.6 - 1100
			}px)`;
			marqueeReverse[5].style.transform = `translateX(${
				percent * 80 * 0.8 - 1500
			}px)`;
			//"Видеографы"
			marqueeReverse[6].style.transform = `translateX(${
				percent * 80 * 0.6 - 1800
			}px)`;
			marqueeReverse[7].style.transform = `translateX(${
				percent * 80 * 0.8 - 2500
			}px)`;
		});

		// Run Box 1, 2, 3:
		document.addEventListener('scroll', () => {
			let percent =
					((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) *
					100,
				translateY = percent * 20 - 850,
				translateY1 = percent * 20 - 850,
				translateY2 = percent * 18 - 850;

			if (translateY < 0) {
				runBox1T.style.transform = `translateY(${-translateY1}px)`;
				runBox1D.style.transform = `translateY(${-translateY2}px)`;
			} else {
				runBox1T.style.transform = `translateY(0px)`;
				runBox1D.style.transform = `translateY(0px)`;
			}
		});
		document.addEventListener('scroll', () => {
			let percent =
					((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) *
					100,
				translateY = percent * 20 - 1200;

			if (translateY < 0) {
				runBox2.style.transform = `translateY(${-translateY}px)`;
			} else {
				runBox2.style.transform = `translateY(0px)`;
			}
		});
		document.addEventListener('scroll', () => {
			let percent =
					((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) *
					100,
				translateY = percent * 20 - 1500,
				translateY1 = percent * 20 - 1500,
				translateY2 = percent * 18 - 1400,
				translateY3 = percent * 16 - 1300;

			if (translateY < 0) {
				runBox3I1.style.transform = `translateY(${-translateY1}px)`;
				runBox3I2.style.transform = `translateY(${-translateY2}px)`;
				runBox3I3.style.transform = `translateY(${-translateY3}px)`;
			} else {
				runBox3I1.style.transform = `translateY(0px)`;
				runBox3I2.style.transform = `translateY(0px)`;
				runBox3I3.style.transform = `translateY(0px)`;
			}
		});

		//CIRCLE ANIMATION ON SCROLL:
		let calcRound = document.querySelector('.calc-round'),
			orderRound = document.querySelector('.order-round');

		document.addEventListener('scroll', () => {
			let percent =
					((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) *
					100,
				rotateCircle1 = percent * 100;

			if (rotateCircle1 < 250) {
				calcRound.style.transform = `rotate(0deg)`;
			} else if (rotateCircle1 < 850) {
				calcRound.style.transform = `rotate(${rotateCircle1 / 5}deg)`;
			} else {
				calcRound.style.transform = `rotate(180deg)`;
			}
		});
		document.addEventListener('scroll', () => {
			let percent =
					((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) *
					100,
				rotateCircle2 = percent * 100 + 600;

			if (rotateCircle2 < 9000) {
				orderRound.style.transform = `rotate(1800deg)`;
			} else if (rotateCircle2 < 9900) {
				orderRound.style.transform = `rotate(${rotateCircle2 / 5}deg)`;
			} else {
				orderRound.style.transform = `rotate(1980deg)`;
			}
		});
	} else if (x <= 1024 && x > 768) {
		//MOBILE (TABLET):
		//
		// Run "НАША КОМАНДА" + *:
		document.addEventListener('scroll', () => {
			let percent =
				((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
			runTeam.style.transform = `translateX(${-percent * 100 + 1000}px)`;
		});
		document.addEventListener('scroll', () => {
			let percent =
				((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
			runAsteriks1.style.transform = `rotate(${-percent * 60}deg)`;
		});

		// Run "Креативный продакшен" + *:
		document.addEventListener('scroll', () => {
			let percent =
				((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
			runCreative.style.transform = `translateX(${
				-percent * 160 + 11000
			}px)`;
		});
		document.addEventListener('scroll', () => {
			let percent =
				((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
			runAsteriks2.style.transform = `rotate(${-percent * 60}deg)`;
		});

		// Run marquee text in "Контентмейкеры", "Дизайнеры", "Разработчики", "Видеографы":
		document.addEventListener('scroll', () => {
			let percent =
				((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
			//"Контентмейкеры"
			marquee[0].style.transform = `translateX(${
				-percent * 60 * 1 + 1200
			}px)`;
			marquee[1].style.transform = `translateX(${
				-percent * 60 * 0.8 + 1000
			}px)`;
			marquee[2].style.transform = `translateX(${
				-percent * 60 * 0.6 + 1000
			}px)`;
			//"Дизайнеры"
			marquee[3].style.transform = `translateX(${
				-percent * 60 * 1 + 1600
			}px)`;
			marquee[4].style.transform = `translateX(${
				-percent * 60 * 0.8 + 1400
			}px)`;
			marquee[5].style.transform = `translateX(${
				-percent * 60 * 0.6 + 800
			}px)`;
			//"Разработчики"
			marquee[6].style.transform = `translateX(${
				-percent * 60 * 1 + 2300
			}px)`;
			marquee[7].style.transform = `translateX(${
				-percent * 60 * 0.8 + 2000
			}px)`;
			marquee[8].style.transform = `translateX(${
				-percent * 60 * 0.6 + 1900
			}px)`;
			//"Видеографы"
			marquee[9].style.transform = `translateX(${
				-percent * 60 * 1 + 1800
			}px)`;
			marquee[10].style.transform = `translateX(${
				-percent * 60 * 0.8 + 1200
			}px)`;
			marquee[11].style.transform = `translateX(${
				-percent * 60 * 0.6 + 1000
			}px)`;
		});
		document.addEventListener('scroll', () => {
			let percent =
				((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
			//"Контентмейкеры"
			marqueeReverse[0].style.transform = `translateX(${
				percent * 60 * 0.6 - 2000
			}px)`;
			marqueeReverse[1].style.transform = `translateX(${
				percent * 60 * 0.8 - 2400
			}px)`;
			//"Дизайнеры"
			marqueeReverse[2].style.transform = `translateX(${
				percent * 60 * 0.6 - 2500
			}px)`;
			marqueeReverse[3].style.transform = `translateX(${
				percent * 60 * 0.8 - 3100
			}px)`;
			//"Разработчики"
			marqueeReverse[4].style.transform = `translateX(${
				percent * 60 * 0.6 - 1700
			}px)`;
			marqueeReverse[5].style.transform = `translateX(${
				percent * 60 * 0.8 - 2000
			}px)`;
			//"Видеографы"
			marqueeReverse[6].style.transform = `translateX(${
				percent * 60 * 0.6 - 1100
			}px)`;
			marqueeReverse[7].style.transform = `translateX(${
				percent * 60 * 0.8 - 1600
			}px)`;
		});

		// Run Box 1, 2, 3:
		document.addEventListener('scroll', () => {
			let percent =
					((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) *
					100,
				translateY = percent * 20 - 650,
				translateY1 = percent * 20 - 650,
				translateY2 = percent * 18 - 650;

			if (translateY < 0) {
				runBox1T.style.transform = `translateY(${-translateY1}px)`;
				runBox1D.style.transform = `translateY(${-translateY2}px)`;
			} else {
				runBox1T.style.transform = `translateY(0px)`;
				runBox1D.style.transform = `translateY(0px)`;
			}
		});
		document.addEventListener('scroll', () => {
			let percent =
					((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) *
					100,
				translateY = percent * 20 - 1000;

			if (translateY < 0) {
				runBox2.style.transform = `translateY(${-translateY}px)`;
			} else {
				runBox2.style.transform = `translateY(0px)`;
			}
		});
		document.addEventListener('scroll', () => {
			let percent =
					((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) *
					100,
				translateY = percent * 20 - 1300,
				translateY1 = percent * 20 - 1300,
				translateY2 = percent * 18 - 1200,
				translateY3 = percent * 16 - 1100;

			if (translateY < 0) {
				runBox3I1.style.transform = `translateY(${-translateY1}px)`;
				runBox3I2.style.transform = `translateY(${-translateY2}px)`;
				runBox3I3.style.transform = `translateY(${-translateY3}px)`;
			} else {
				runBox3I1.style.transform = `translateY(0px)`;
				runBox3I2.style.transform = `translateY(0px)`;
				runBox3I3.style.transform = `translateY(0px)`;
			}
		});

		//CIRCLE ANIMATION ON SCROLL:
		let calcRound = document.querySelector('.calc-round'),
			orderRound = document.querySelector('.order-round');

		document.addEventListener('scroll', () => {
			let percent =
					((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) *
					100,
				rotateCircle1 = percent * 100;

			if (rotateCircle1 < 200) {
				calcRound.style.transform = `rotate(0deg)`;
			} else if (rotateCircle1 < 850) {
				calcRound.style.transform = `rotate(${rotateCircle1 / 5}deg)`;
			} else {
				calcRound.style.transform = `rotate(180deg)`;
			}
		});
		document.addEventListener('scroll', () => {
			let percent =
					((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) *
					100,
				rotateCircle2 = percent * 100 + 600;

			if (rotateCircle2 < 9000) {
				orderRound.style.transform = `rotate(1800deg)`;
			} else if (rotateCircle2 < 9900) {
				orderRound.style.transform = `rotate(${rotateCircle2 / 5}deg)`;
			} else {
				orderRound.style.transform = `rotate(1980deg)`;
			}
		});
	} else if (x <= 768 && x > 430) {
		//MOBILE (TABLET):
		//
		// Run "НАША КОМАНДА" + *:
		document.addEventListener('scroll', () => {
			let percent =
				((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
			runTeam.style.transform = `translateX(${-percent * 80 + 600}px)`;
		});
		document.addEventListener('scroll', () => {
			let percent =
				((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
			runAsteriks1.style.transform = `rotate(${-percent * 60}deg)`;
		});

		// Run "Креативный продакшен" + *:
		document.addEventListener('scroll', () => {
			let percent =
				((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
			runCreative.style.transform = `translateX(${
				-percent * 70 + 5000
			}px)`;
		});
		document.addEventListener('scroll', () => {
			let percent =
				((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
			runAsteriks2.style.transform = `rotate(${-percent * 60}deg)`;
		});

		// Run marquee text in "Контентмейкеры", "Дизайнеры", "Разработчики", "Видеографы":
		document.addEventListener('scroll', () => {
			let percent =
				((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
			//"Контентмейкеры"
			marquee[0].style.transform = `translateX(${
				-percent * 60 * 1 + 1500
			}px)`;
			marquee[1].style.transform = `translateX(${
				-percent * 60 * 0.8 + 1300
			}px)`;
			marquee[2].style.transform = `translateX(${
				-percent * 60 * 0.6 + 1300
			}px)`;
			//"Дизайнеры"
			marquee[3].style.transform = `translateX(${
				-percent * 60 * 1 + 1600
			}px)`;
			marquee[4].style.transform = `translateX(${
				-percent * 60 * 0.8 + 1400
			}px)`;
			marquee[5].style.transform = `translateX(${
				-percent * 60 * 0.6 + 1000
			}px)`;
			//"Разработчики"
			marquee[6].style.transform = `translateX(${
				-percent * 60 * 1 + 1600
			}px)`;
			marquee[7].style.transform = `translateX(${
				-percent * 60 * 0.6 + 1700
			}px)`;
			marquee[8].style.transform = `translateX(${
				-percent * 60 * 0.8 + 2200
			}px)`;
			//"Видеографы"
			marquee[9].style.transform = `translateX(${
				-percent * 60 * 1 + 1800
			}px)`;
			marquee[10].style.transform = `translateX(${
				-percent * 60 * 0.8 + 1400
			}px)`;
			marquee[11].style.transform = `translateX(${
				-percent * 60 * 0.6 + 1200
			}px)`;
		});
		document.addEventListener('scroll', () => {
			let percent =
				((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
			//"Контентмейкеры"
			marqueeReverse[0].style.transform = `translateX(${
				percent * 60 * 0.6 - 1100
			}px)`;
			marqueeReverse[1].style.transform = `translateX(${
				percent * 60 * 0.8 - 1400
			}px)`;
			//"Дизайнеры"
			marqueeReverse[2].style.transform = `translateX(${
				percent * 60 * 0.6 - 1500
			}px)`;
			marqueeReverse[3].style.transform = `translateX(${
				percent * 60 * 0.8 - 2000
			}px)`;
			//"Разработчики"
			marqueeReverse[4].style.transform = `translateX(${
				percent * 60 * 0.6 + 100
			}px)`;
			marqueeReverse[5].style.transform = `translateX(${
				percent * 60 * 0.8 - 200
			}px)`;
			//"Видеографы"
			marqueeReverse[6].style.transform = `translateX(${
				percent * 60 * 0.6 - 1800
			}px)`;
			marqueeReverse[7].style.transform = `translateX(${
				percent * 60 * 0.8 - 2400
			}px)`;
		});

		// Run Box 1, 2, 3:
		document.addEventListener('scroll', () => {
			let percent =
					((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) *
					100,
				translateY = percent * 20 - 650,
				translateY1 = percent * 20 - 650,
				translateY2 = percent * 18 - 650;

			if (translateY < 0) {
				runBox1T.style.transform = `translateY(${-translateY1}px)`;
				runBox1D.style.transform = `translateY(${-translateY2}px)`;
			} else {
				runBox1T.style.transform = `translateY(0px)`;
				runBox1D.style.transform = `translateY(0px)`;
			}
		});
		document.addEventListener('scroll', () => {
			let percent =
					((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) *
					100,
				translateY = percent * 20 - 1000;

			if (translateY < 0) {
				runBox2.style.transform = `translateY(${-translateY}px)`;
			} else {
				runBox2.style.transform = `translateY(0px)`;
			}
		});
		document.addEventListener('scroll', () => {
			let percent =
					((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) *
					100,
				translateY = percent * 20 - 1300,
				translateY1 = percent * 20 - 1300,
				translateY2 = percent * 18 - 1200,
				translateY3 = percent * 16 - 1100;

			if (translateY < 0) {
				runBox3I1.style.transform = `translateY(${-translateY1}px)`;
				runBox3I2.style.transform = `translateY(${-translateY2}px)`;
				runBox3I3.style.transform = `translateY(${-translateY3}px)`;
			} else {
				runBox3I1.style.transform = `translateY(0px)`;
				runBox3I2.style.transform = `translateY(0px)`;
				runBox3I3.style.transform = `translateY(0px)`;
			}
		});

		// Run "Рассчитать проект":
		let orangeCircle = document.querySelector('#mob-calc_animate');

		document.addEventListener('scroll', () => {
			let percent =
					((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) *
					100,
				translateY = percent * 26.5;
			orangeCircle.style.transform = `translateY(${translateY}px)`;
		});

		// window.onscroll = function () {
		// 	let position = 0;
		// 	if (scrollY)
		// 		//usual
		// 		position = scrollY;
		// 	else if (document.documentElement.clientHeight)
		// 		//ie
		// 		position = document.documentElement.scrollTop;
		// 	else if (document.body)
		// 		//ie quirks
		// 		position = document.body.scrollTop;

		// 	orangeCircle.style.transform = `translateY(${position}px)`;
		// };
	} else if (x <= 430 && x > 375) {
		//MOBILE:
		//
		// Run "НАША КОМАНДА" + *:
		document.addEventListener('scroll', () => {
			let percent =
				((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
			runTeam.style.transform = `translateX(${-percent * 40 + 60}px)`;
		});
		document.addEventListener('scroll', () => {
			let percent =
				((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
			runAsteriks1.style.transform = `rotate(${-percent * 60}deg)`;
		});

		// Run "Креативный продакшен" + *:
		document.addEventListener('scroll', () => {
			let percent =
				((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
			runCreative.style.transform = `translateX(${
				-percent * 50 + 3500
			}px)`;
		});
		document.addEventListener('scroll', () => {
			let percent =
				((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
			runAsteriks2.style.transform = `rotate(${-percent * 60}deg)`;
		});

		// Run marquee text in "Контентмейкеры", "Дизайнеры", "Разработчики", "Видеографы":
		document.addEventListener('scroll', () => {
			let percent =
				((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
			//"Контентмейкеры"
			marquee[0].style.transform = `translateX(${
				-percent * 60 * 0.6 + 1500
			}px)`;
			marquee[1].style.transform = `translateX(${
				-percent * 60 * 0.5 + 1400
			}px)`;
			marquee[2].style.transform = `translateX(${
				-percent * 60 * 0.4 + 1400
			}px)`;
			//"Дизайнеры"
			marquee[3].style.transform = `translateX(${
				-percent * 60 * 0.6 + 1500
			}px)`;
			marquee[4].style.transform = `translateX(${
				-percent * 60 * 0.5 + 1300
			}px)`;
			marquee[5].style.transform = `translateX(${
				-percent * 60 * 0.4 + 1300
			}px)`;
			//"Разработчики"
			marquee[6].style.transform = `translateX(${
				-percent * 60 * 0.6 + 1500
			}px)`;
			marquee[7].style.transform = `translateX(${
				-percent * 60 * 0.5 + 1800
			}px)`;
			marquee[8].style.transform = `translateX(${
				-percent * 60 * 0.4 + 1700
			}px)`;
			//"Видеографы"
			marquee[9].style.transform = `translateX(${
				-percent * 60 * 0.6 + 1700
			}px)`;
			marquee[10].style.transform = `translateX(${
				-percent * 60 * 0.5 + 1600
			}px)`;
			marquee[11].style.transform = `translateX(${
				-percent * 60 * 0.4 + 1400
			}px)`;
		});
		document.addEventListener('scroll', () => {
			let percent =
				((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
			//"Контентмейкеры"
			marqueeReverse[0].style.transform = `translateX(${
				percent * 60 * 0.4 + 150
			}px)`;
			marqueeReverse[1].style.transform = `translateX(${
				percent * 60 * 0.5 + 1
			}px)`;
			//"Дизайнеры"
			marqueeReverse[2].style.transform = `translateX(${
				percent * 60 * 0.4 + 1
			}px)`;
			marqueeReverse[3].style.transform = `translateX(${
				percent * 60 * 0.5 - 150
			}px)`;
			//"Разработчики"
			marqueeReverse[4].style.transform = `translateX(${
				percent * 60 * 0.4 + 400
			}px)`;
			marqueeReverse[5].style.transform = `translateX(${
				percent * 60 * 0.5 + 700
			}px)`;
			//"Видеографы"
			marqueeReverse[6].style.transform = `translateX(${
				percent * 60 * 0.4 - 200
			}px)`;
			marqueeReverse[7].style.transform = `translateX(${
				percent * 60 * 0.5 - 500
			}px)`;
		});

		// Run Box 1, 2, 3:
		document.addEventListener('scroll', () => {
			let percent =
					((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) *
					100,
				translateY = percent * 20 - 650,
				translateY1 = percent * 20 - 650,
				translateY2 = percent * 18 - 650;

			if (translateY < 0) {
				runBox1T.style.transform = `translateY(${-translateY1}px)`;
				runBox1D.style.transform = `translateY(${-translateY2}px)`;
			} else {
				runBox1T.style.transform = `translateY(0px)`;
				runBox1D.style.transform = `translateY(0px)`;
			}
		});
		document.addEventListener('scroll', () => {
			let percent =
					((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) *
					100,
				translateY = percent * 20 - 1100;

			if (translateY < 0) {
				runBox2.style.transform = `translateY(${-translateY}px)`;
			} else {
				runBox2.style.transform = `translateY(0px)`;
			}
		});
		document.addEventListener('scroll', () => {
			let percent =
					((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) *
					100,
				translateY = percent * 20 - 1300,
				translateY1 = percent * 20 - 1500,
				translateY2 = percent * 18 - 1400,
				translateY3 = percent * 16 - 1300;

			if (translateY < 0) {
				runBox3I1.style.transform = `translateY(${-translateY1}px)`;
				runBox3I2.style.transform = `translateY(${-translateY2}px)`;
				runBox3I3.style.transform = `translateY(${-translateY3}px)`;
			} else {
				runBox3I1.style.transform = `translateY(0px)`;
				runBox3I2.style.transform = `translateY(0px)`;
				runBox3I3.style.transform = `translateY(0px)`;
			}
		});

		// Run "Рассчитать проект":
		let orangeCircle = document.querySelector('#mob-calc_animate');

		document.addEventListener('scroll', () => {
			let percent =
					((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) *
					100,
				translateY = percent * 29;
			orangeCircle.style.transform = `translateY(${translateY}px)`;
		});

		// Run "Заполнить бриф":
		// let whiteCircle = document.querySelector('#mob-order_animate');

		// document.addEventListener('scroll', () => {
		// 	let percent = ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100,
		// 		translateX = percent;
		// 	if (translateX <= 100 && translateX > 80) {
		// 		whiteCircle.style.transform = `translateX(${translateX * 10 - 750}px)`;
		// 	} else {
		// 		whiteCircle.style.transform = `translateX(0)`;
		// });
	} else {
		//MOBILE (iPhone 6/7/8):
		//
		// Run "НАША КОМАНДА" + *:
		document.addEventListener('scroll', () => {
			let percent =
				((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
			runTeam.style.transform = `translateX(${-percent * 40 + 40}px)`;
		});
		document.addEventListener('scroll', () => {
			let percent =
				((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
			runAsteriks1.style.transform = `rotate(${-percent * 60}deg)`;
		});

		// Run "Креативный продакшен" + *:
		document.addEventListener('scroll', () => {
			let percent =
				((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
			runCreative.style.transform = `translateX(${
				-percent * 50 + 3500
			}px)`;
		});
		document.addEventListener('scroll', () => {
			let percent =
				((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
			runAsteriks2.style.transform = `rotate(${-percent * 60}deg)`;
		});

		// Run marquee text in "Контентмейкеры", "Дизайнеры", "Разработчики", "Видеографы":
		document.addEventListener('scroll', () => {
			let percent =
				((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
			//"Контентмейкеры"
			marquee[0].style.transform = `translateX(${
				-percent * 60 * 0.6 + 1500
			}px)`;
			marquee[1].style.transform = `translateX(${
				-percent * 60 * 0.5 + 1400
			}px)`;
			marquee[2].style.transform = `translateX(${
				-percent * 60 * 0.4 + 1400
			}px)`;
			//"Дизайнеры"
			marquee[3].style.transform = `translateX(${
				-percent * 60 * 0.6 + 1500
			}px)`;
			marquee[4].style.transform = `translateX(${
				-percent * 60 * 0.5 + 1300
			}px)`;
			marquee[5].style.transform = `translateX(${
				-percent * 60 * 0.4 + 1300
			}px)`;
			//"Разработчики"
			marquee[6].style.transform = `translateX(${
				-percent * 60 * 0.6 + 1500
			}px)`;
			marquee[7].style.transform = `translateX(${
				-percent * 60 * 0.5 + 1800
			}px)`;
			marquee[8].style.transform = `translateX(${
				-percent * 60 * 0.4 + 1700
			}px)`;
			//"Видеографы"
			marquee[9].style.transform = `translateX(${
				-percent * 60 * 0.6 + 1700
			}px)`;
			marquee[10].style.transform = `translateX(${
				-percent * 60 * 0.5 + 1600
			}px)`;
			marquee[11].style.transform = `translateX(${
				-percent * 60 * 0.4 + 1400
			}px)`;
		});
		document.addEventListener('scroll', () => {
			let percent =
				((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
			//"Контентмейкеры"
			marqueeReverse[0].style.transform = `translateX(${
				percent * 60 * 0.4 + 150
			}px)`;
			marqueeReverse[1].style.transform = `translateX(${
				percent * 60 * 0.5 + 1
			}px)`;
			//"Дизайнеры"
			marqueeReverse[2].style.transform = `translateX(${
				percent * 60 * 0.4 + 1
			}px)`;
			marqueeReverse[3].style.transform = `translateX(${
				percent * 60 * 0.5 - 150
			}px)`;
			//"Разработчики"
			marqueeReverse[4].style.transform = `translateX(${
				percent * 60 * 0.4 + 400
			}px)`;
			marqueeReverse[5].style.transform = `translateX(${
				percent * 60 * 0.5 + 700
			}px)`;
			//"Видеографы"
			marqueeReverse[6].style.transform = `translateX(${
				percent * 60 * 0.4 - 200
			}px)`;
			marqueeReverse[7].style.transform = `translateX(${
				percent * 60 * 0.5 - 500
			}px)`;
		});

		// Run Box 1, 2, 3:
		document.addEventListener('scroll', () => {
			let percent =
					((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) *
					100,
				translateY = percent * 20 - 650,
				translateY1 = percent * 20 - 650,
				translateY2 = percent * 18 - 650;

			if (translateY < 0) {
				runBox1T.style.transform = `translateY(${-translateY1}px)`;
				runBox1D.style.transform = `translateY(${-translateY2}px)`;
			} else {
				runBox1T.style.transform = `translateY(0px)`;
				runBox1D.style.transform = `translateY(0px)`;
			}
		});
		document.addEventListener('scroll', () => {
			let percent =
					((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) *
					100,
				translateY = percent * 20 - 1100;

			if (translateY < 0) {
				runBox2.style.transform = `translateY(${-translateY}px)`;
			} else {
				runBox2.style.transform = `translateY(0px)`;
			}
		});
		document.addEventListener('scroll', () => {
			let percent =
					((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) *
					100,
				translateY = percent * 20 - 1300,
				translateY1 = percent * 20 - 1500,
				translateY2 = percent * 18 - 1400,
				translateY3 = percent * 16 - 1300;

			if (translateY < 0) {
				runBox3I1.style.transform = `translateY(${-translateY1}px)`;
				runBox3I2.style.transform = `translateY(${-translateY2}px)`;
				runBox3I3.style.transform = `translateY(${-translateY3}px)`;
			} else {
				runBox3I1.style.transform = `translateY(0px)`;
				runBox3I2.style.transform = `translateY(0px)`;
				runBox3I3.style.transform = `translateY(0px)`;
			}
		});

		// Run "Рассчитать проект":
		let orangeCircle = document.querySelector('#mob-calc_animate');

		document.addEventListener('scroll', () => {
			let percent =
					((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) *
					100,
				translateY = percent * 27;
			orangeCircle.style.transform = `translateY(${translateY}px)`;
		});
	}
});
