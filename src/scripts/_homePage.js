import {
	calcButtonAnimation,
	calcOrangeButtonAnimation,
	creativeHeaderAnimation,
	headerAnimation,
	positionOnReload,
	resolutionCheck,
	serviceBoxAnimation,
	teamBoxAnimation,
	teamHeaderAnimation,
} from './_functions';

export function homePage() {
	if (document.querySelector('.wrapper-index')) {
		const w = window;
		const d = document.documentElement;
		const b = document.body;
		const st = 'scrollTop';
		const sh = 'scrollHeight';
		const x = w.innerWidth || d.clientWidth || b.clientWidth;
		const y = w.innerHeight || d.clientHeight || b.clientHeight;

		//* плавное раскрытие списков:
		if (document.querySelectorAll('.expand_btn')) {
			const expandButton = document.querySelectorAll('.expand_btn');
			const expandableBox = document.querySelectorAll('.expandable_box');
			const expandableTitle = document.querySelectorAll('.expandable_title');
			const expandAction = document.querySelectorAll('.expand_btn_icon');

			//* закрытие другого открытого списка при открытии текущего:
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
		}

		//* ANIMATIONS ON SCROLL:

		//* HEADER LOGO ANIMATION:
		if (document.querySelector('#logo_box')) {
			const runLogoBox = document.querySelector('#logo_box');
			const runLogoImg = document.querySelector('#logo_img');
			const scrolledPage = d[st] || b[st];
			const translationSpeed = 0.34;
			const scaleSpeed = 0.0224;

			if (x > 1024) {
				//* Minimize HEADER LOGO if page reloads of height more than 166px
				headerAnimation(
					scrolledPage,
					translationSpeed,
					scaleSpeed,
					runLogoBox,
					runLogoImg
				);

				//* Run HEADER LOGO:
				document.addEventListener('scroll', () => {
					const scrolledPage = d[st] || b[st];

					headerAnimation(
						scrolledPage,
						translationSpeed,
						scaleSpeed,
						runLogoBox,
						runLogoImg
					);
				});
			}
		}

		//* TOP CIRCLE ANIMATION:
		if (document.querySelector('.calc-round')) {
			const intro = document.querySelector('.intro');
			const calcRound = document.querySelector('.calc-round');
			const introHeight = intro[sh];
			let rotationSpeed;
			let ratio;

			// DESKTOP ONLY:
			if (x > 768) {
				if (resolutionCheck.resolution === 'desktopMiddle') {
					rotationSpeed = 1;
					ratio = 1.1;
				} else if (resolutionCheck.resolution === 'desktopSmall') {
					rotationSpeed = 1;
					ratio = 1;
				} else if (resolutionCheck.resolution === 'bigTabletVert') {
					rotationSpeed = 1;
					ratio = 2;
				} else if (resolutionCheck.resolution === 'middleTabletVert') {
					rotationSpeed = 1;
					ratio = 2.25;
				} else {
					rotationSpeed = 1;
					ratio = 1.125;
				}

				const startAnimation = introHeight * ratio;

				document.addEventListener('scroll', () => {
					const scrolledIntro =
						(d.clientHeight || b.clientHeight) -
						intro.getBoundingClientRect().y;
					const startDeg = scrolledIntro - startAnimation;

					calcButtonAnimation(
						scrolledIntro,
						startAnimation,
						startDeg,
						rotationSpeed,
						calcRound
					);
				});
			}
		}

		//* CALC ORANGE CIRCLE ANIMATION (ON MOBILE DEVICES):
		if (document.querySelector('#mob-calc_animate')) {
			const orangeCircle = document.querySelector('#mob-calc_animate');
			let ratio;

			document.addEventListener('scroll', () => {
				const percent =
					((d[st] || b[st]) / ((d[sh] || b[sh]) - d.clientHeight)) * 100;

				if (x > 430 && x <= 768) {
					ratio = 30;
				} else if (x > 375 && x <= 430) {
					ratio = 29;
				} else {
					ratio = 27;
				}

				calcOrangeButtonAnimation(orangeCircle, percent, ratio);
			});
		}

		//* OUR TEAM HEADER ANIMATION:
		if (document.querySelector('#run_team')) {
			const teamBlock = document.querySelector('.team');
			const runTeam = document.querySelector('#run_team');
			const runAsteriks1 = document.querySelector('#run_asteriks1');
			let ratioDeg = 60; // angle speed
			let ratio1; // run speed
			let ratio2; // startPoint
			let ratio3; // coeff for reload
			let thresholdRatio = 0.2;

			if (resolutionCheck.resolution === 'desktop') {
				ratio1 = 3.5;
				ratio2 = 2000;
				ratio3 = 0.1;
				ratioDeg = 60;
			} else if (resolutionCheck.resolution === 'desktopMiddle') {
				ratio1 = 3.75;
				ratio2 = 1500;
				ratio3 = 0.45;
				ratioDeg = 80;
			} else if (resolutionCheck.resolution === 'desktopSmall') {
				ratio1 = 4;
				ratio2 = 1700;
				ratio3 = 0.5;
				ratioDeg = 90;
				thresholdRatio = 0.15;
			} else if (resolutionCheck.resolution === 'bigTabletVert') {
				ratio1 = 3.5;
				ratio2 = 3060;
				ratio3 = -0.15;
				thresholdRatio = 0.2;
			} else if (resolutionCheck.resolution === 'middleTabletVert') {
				ratio1 = 3.5;
				ratio2 = 2650;
				ratio3 = -0.2;
				thresholdRatio = 0.2;
			} else if (resolutionCheck.resolution === 'smallTabletVert') {
				ratio1 = 3.5;
				ratio2 = 2250;
				ratio3 = -0.25;
				thresholdRatio = 0.2;
			} else if (resolutionCheck.resolution === 'bigPhoneVert') {
				// ratio1 = 2.5;
				// ratio2 = 1400;
				// ratio3 = -0.4;
				ratio1 = 2.5;
				ratio2 = 1200;
				ratio3 = -0.4;
				thresholdRatio = 0.2;
			} else if (resolutionCheck.resolution === 'middlePhoneVert') {
				ratio1 = 2.75;
				ratio2 = 1100;
				ratio3 = -0.4;
				thresholdRatio = 0.2;
			} else if (resolutionCheck.resolution === 'smallPhoneVert') {
				ratio1 = 2.5;
				ratio2 = 650;
				ratio3 = -0.3;
				thresholdRatio = 0.2;
			}

			// for reload page not at top:
			runAsteriks1.classList.add('preloadDocClass');
			runTeam.classList.add('preloadDocClass');
			runAsteriks1.style.transform = `rotate(${-ratio2 * ratio3}deg)`; // start deg after reload
			runTeam.style.transform = `translateX(${ratio2}px)`; // startPoint after reload
			runTeam.style.opacity = 0;

			const observerTeamHeader = new IntersectionObserver(
				entries => {
					entries.forEach(({ isIntersecting }) => {
						if (isIntersecting) {
							runAsteriks1.classList.remove('preloadDocClass');
							runTeam.classList.remove('preloadDocClass');

							document.addEventListener('scroll', () => {
								const teamBlockHeight = teamBlock[sh]; // 813
								const startAnimation = teamBlockHeight / teamBlockHeight; // 1
								const scrolledTeamBlock =
									(d.clientHeight || b.clientHeight) -
									teamBlock.getBoundingClientRect().y; // 0 - 813
								const percent =
									((d[st] || b[st]) / ((d[sh] || b[sh]) - d.clientHeight)) *
									100;

								teamHeaderAnimation(
									scrolledTeamBlock,
									percent,
									startAnimation,
									ratioDeg,
									ratio1,
									ratio2,
									runAsteriks1,
									runTeam
								);
							});
						}
					});
				},
				{
					threshold: thresholdRatio,
				}
			);
			observerTeamHeader.observe(teamBlock);
		}

		//* CREATIVE PRODUCTION HEADER ANIMATION:
		if (document.querySelector('#run_team')) {
			const servicesBlock = document.querySelector('.contentBoxForAnimation');
			const runCreative = document.querySelector('#run_creative');
			const runAsteriks2 = document.querySelector('#run_asteriks2');
			let ratioDeg = 60; // angle speed
			let ratio1; // run speed
			let ratio2; // startPoint
			let ratio3; // coeff for reload
			let thresholdRatio = 0.1;

			if (resolutionCheck.resolution === 'desktop') {
				ratio1 = 3.75;
				ratio2 = 3200;
				ratio3 = 0.85;
				ratioDeg = 60;
			} else if (resolutionCheck.resolution === 'desktopMiddle') {
				ratio1 = 5;
				ratio2 = 3400;
				ratio3 = 0.75;
				ratio3 = 1.05;
				ratioDeg = 80;
			} else if (resolutionCheck.resolution === 'desktopSmall') {
				ratio1 = 6;
				ratio2 = 3800;
				ratio3 = 1.1;
				ratioDeg = 90;
			} else if (resolutionCheck.resolution === 'bigTabletVert') {
				ratio1 = 3.5;
				ratio2 = 2300;
				ratio3 = 0.95;
			} else if (resolutionCheck.resolution === 'middleTabletVert') {
				ratio1 = 3.5;
				ratio2 = 1800;
				ratio3 = 1;
			} else if (resolutionCheck.resolution === 'smallTabletVert') {
				ratio1 = 3.25;
				ratio2 = 1600;
				ratio3 = 1.3;
			} else if (resolutionCheck.resolution === 'bigPhoneVert') {
				ratio1 = 2.5;
				ratio2 = 1100;
				ratio3 = 2.1;
			} else if (resolutionCheck.resolution === 'middlePhoneVert') {
				ratio1 = 2.5;
				ratio2 = 1050;
				ratio3 = 2.1;
			} else if (resolutionCheck.resolution === 'smallPhoneVert') {
				ratio1 = 2.5;
				ratio2 = 900;
				ratio3 = 2.75;
			}

			// for reload page not at top:
			runAsteriks2.classList.add('preloadDocClass');
			runCreative.classList.add('preloadDocClass');
			runAsteriks2.style.transform = `rotate(${-ratio2 * ratio3}deg)`; // start deg after reload
			runCreative.style.transform = `translateX(${ratio2}px)`; // startPoint after reload
			runCreative.style.opacity = 0;

			const observerCreativeHeader = new IntersectionObserver(
				entries => {
					entries.forEach(({ isIntersecting }) => {
						if (isIntersecting) {
							runCreative.classList.remove('preloadDocClass');
							runAsteriks2.classList.remove('preloadDocClass');

							document.addEventListener('scroll', () => {
								const servicesBlockHeight = servicesBlock[sh]; // 837
								const startAnimation =
									servicesBlockHeight / servicesBlockHeight; // 1
								const scrolledServicesBlock =
									(d.clientHeight || b.clientHeight) -
									servicesBlock.getBoundingClientRect().y;
								const percent =
									((d[st] || b[st]) / ((d[sh] || b[sh]) - d.clientHeight)) *
									100;

								creativeHeaderAnimation(
									scrolledServicesBlock,
									percent,
									startAnimation,
									ratioDeg,
									ratio1,
									ratio2,
									runAsteriks2,
									runCreative
								);
							});
						}
					});
				},
				{
					threshold: thresholdRatio,
				}
			);
			observerCreativeHeader.observe(servicesBlock);
		}

		//* POSITIONS BLOCKS ANIMATION:
		if (document.querySelector('.team__box')) {
			const teamBox = document.querySelector('.team__box');
			const teamBoxRows = document.querySelectorAll('.contentRow');

			// FOR DESKTOP:
			let ratio1 = 0.5; // run speed
			let ratio2 = 0.6; // run speed
			let ratio3 = 0.7; // run speed
			let startRatio1 = 100;
			let startRatio2 = -500;
			let startRatio3 = 500;
			let startRatio4 = -400;
			let startRatio5 = 700;
			let startRatio6 = 200;
			let startRatio7 = -500;
			let startRatio8 = 100;
			let startRatio9 = -800;
			let startRatio10 = 200;
			let startRatio11 = 1100;
			let startRatio12 = 300;
			let startRatio13 = 1000;
			let startRatio14 = -200;
			let startRatio15 = 1100;
			let startRatio16 = 100;
			let startRatio17 = -1100;
			let startRatio18 = 400;
			let startRatio19 = -1200;
			let startRatio20 = -100;
			let thresholdRatio = 0.1;

			if (resolutionCheck.resolution === 'desktopMiddle') {
				startRatio1 -= 100;
				startRatio2 += 100;
				startRatio3 -= 100;
				startRatio4 += 100;
				startRatio5 -= 100;
				startRatio6 -= 100;
				startRatio10 -= 100;
				startRatio14 += 100;
				startRatio15 -= 100;
				startRatio16 -= 100;
				startRatio17 += 100;
				startRatio18 -= 100;
			} else if (resolutionCheck.resolution === 'desktopSmall') {
				startRatio1 -= 100;
				startRatio2 += 100;
				startRatio3 -= 100;
				startRatio4 += 100;
				startRatio5 -= 100;
				startRatio6 -= 100;
				startRatio10 -= 100;
				startRatio14 += 100;
				startRatio15 -= 100;
				startRatio16 -= 100;
				startRatio17 += 200;
				startRatio18 -= 200;
			} else if (resolutionCheck.resolution === 'bigTabletVert') {
				startRatio1 += 300;
				startRatio2 += 600;
				startRatio3 = 500;
				startRatio4 += 500;
				startRatio5 = 700;
				startRatio6 += 300;
				startRatio7 += 300;
				startRatio8 += 400;
				startRatio9 += 400;
				startRatio10 += 200;
				startRatio11 += 200;
				startRatio12 += 200;
				startRatio13 += 300;
				startRatio14 += 300;
				startRatio15 += 100;
				startRatio16 += 300;
				startRatio17 += 600;
				startRatio18 += 200;
				startRatio19 += 400;
				startRatio20 += 400;
			} else if (resolutionCheck.resolution === 'middleTabletVert') {
				startRatio1 += 600;
				startRatio2 += 800;
				startRatio3 += 400;
				startRatio4 += 700;
				startRatio5 += 300;
				startRatio6 += 500;
				startRatio7 += 700;
				startRatio8 += 600;
				startRatio9 += 800;
				startRatio10 += 500;
				startRatio11 += 400;
				startRatio12 += 300;
				startRatio13 += 500;
				startRatio14 += 500;
				startRatio15 += 300;
				startRatio16 += 500;
				startRatio17 += 1100;
				startRatio18 += 300;
				startRatio19 += 900;
				startRatio20 += 700;
			} else if (resolutionCheck.resolution === 'smallTabletVert') {
				startRatio1 += 600;
				startRatio2 += 900;
				startRatio3 += 400;
				startRatio4 += 900;
				startRatio5 += 400;
				startRatio6 += 600;
				startRatio7 += 800;
				startRatio8 += 700;
				startRatio9 += 900;
				startRatio10 += 600;
				startRatio11 += 300;
				startRatio12 += 500;
				startRatio13 += 400;
				startRatio14 += 700;
				startRatio15 += 300;
				startRatio16 += 600;
				startRatio17 += 1200;
				startRatio18 += 400;
				startRatio19 += 1100;
				startRatio20 += 800;
			} else if (resolutionCheck.resolution === 'bigPhoneVert') {
				ratio1 = 0.4;
				ratio2 = 0.5;
				ratio3 = 0.6;
				startRatio1 += 1000;
				startRatio2 += 800;
				startRatio3 += 700;
				startRatio4 += 700;
				startRatio5 += 600;
				startRatio6 += 1000;
				startRatio7 += 600;
				startRatio8 += 1200;
				startRatio9 += 800;
				startRatio10 += 1000;
				startRatio11 += 500;
				startRatio12 += 900;
				startRatio13 += 600;
				startRatio14 += 1200;
				startRatio15 += 400;
				startRatio16 += 1000;
				startRatio17 += 1100;
				startRatio18 += 800;
				startRatio19 += 1000;
				startRatio20 += 1200;
			} else if (resolutionCheck.resolution === 'middlePhoneVert') {
				ratio1 = 0.4;
				ratio2 = 0.5;
				ratio3 = 0.6;
				startRatio1 += 1000;
				startRatio2 += 800;
				startRatio3 += 700;
				startRatio4 += 700;
				startRatio5 += 600;
				startRatio6 += 1000;
				startRatio7 += 650;
				startRatio8 += 1150;
				startRatio9 += 800;
				startRatio10 += 900;
				startRatio11 -= 150;
				startRatio12 += 1000;
				startRatio13 += 0;
				startRatio14 += 1300;
				startRatio15 -= 200;
				startRatio16 += 1050;
				startRatio17 += 1100;
				startRatio18 += 850;
				startRatio19 += 1000;
				startRatio20 += 1200;
			} else if (resolutionCheck.resolution === 'smallPhoneVert') {
				startRatio1 += 1050;
				startRatio2 += 800;
				startRatio3 += 700;
				startRatio4 += 700;
				startRatio5 += 550;
				startRatio6 += 950;
				startRatio7 += 650;
				startRatio8 += 1150;
				startRatio9 += 800;
				startRatio10 += 900;
				startRatio11 += 400;
				startRatio12 += 950;
				startRatio13 += 0;
				startRatio14 += 1250;
				startRatio15 -= 200;
				startRatio16 += 1050;
				startRatio17 += 1100;
				startRatio18 += 850;
				startRatio19 += 1000;
				startRatio20 += 1200;
			}

			const observerPositions = new IntersectionObserver(
				entries => {
					entries.forEach(({ isIntersecting }) => {
						if (isIntersecting) {
							document.addEventListener('scroll', () => {
								const scrolledTeamBox =
									(d.clientHeight || b.clientHeight) -
									teamBox.getBoundingClientRect().y;

								teamBoxRows.forEach(item => {
									const wrapper = item.parentElement;
									const row = item.parentElement.children;
									let startPoint1;
									let startPoint2;
									let startPoint3;
									let startPoint4;
									let startPoint5;

									switch (true) {
										//"Медредакторы"
										case wrapper.classList.contains('medEditorsWrapper'):
											startPoint1 = startRatio1;
											startPoint2 = startRatio2;
											startPoint3 = startRatio3;
											startPoint4 = startRatio4;
											startPoint5 = startRatio5;

											break;
										//"Дизайнеры"
										case wrapper.classList.contains('designersWrapper'):
											startPoint1 = startRatio6;
											startPoint2 = startRatio7;
											startPoint3 = startRatio8;
											startPoint4 = startRatio9;
											startPoint5 = startRatio10;
											break;
										//"Разработчики"
										case wrapper.classList.contains('developersWrapper'):
											startPoint1 = startRatio11;
											startPoint2 = startRatio12;
											startPoint3 = startRatio13;
											startPoint4 = startRatio14;
											startPoint5 = startRatio15;
											break;
										//"Видеографы"
										case wrapper.classList.contains('videographersWrapper'):
											startPoint1 = startRatio16;
											startPoint2 = startRatio17;
											startPoint3 = startRatio18;
											startPoint4 = startRatio19;
											startPoint5 = startRatio20;
											break;
									}

									teamBoxAnimation(
										row[0],
										row[1],
										row[2],
										row[3],
										row[4],
										wrapper,
										scrolledTeamBox,
										ratio1,
										ratio2,
										ratio3,
										startPoint1,
										startPoint2,
										startPoint3,
										startPoint4,
										startPoint5
									);
								});
							});
						}
					});
				},
				{
					threshold: thresholdRatio,
				}
			);
			observerPositions.observe(teamBox);
		}

		//* TEXT BLOCKS ANIMATIONS:
		if (document.querySelector('.services__box')) {
			const servicesBox1 = document.querySelector('.services__box_1');
			const servicesBox2 = document.querySelector('.services__box_2');
			const servicesBox3 = document.querySelector('.services__box_3');
			const servicesBox4 = document.querySelector('.services__box_4');
			const servicesBox6 = document.querySelector('.services__box_6');
			const runBox1T = document.querySelector('#run_box1_t');
			const runBox1D = document.querySelector('#run_box1_d');
			const runBox2 = document.querySelector('#run_box2');
			const runBox3I1 = document.querySelector('#run_box3_item1');
			const runBox3I3 = document.querySelector('#run_box3_item3');
			let ratio1 = 1; // coeff
			let ratio2 = 1.1; // run speed1
			let thresholdRatio = 0.2;

			runBox1T.classList.add('preloadDocClass');
			runBox1D.classList.add('preloadDocClass');
			runBox2.classList.add('preloadDocClass');
			runBox3I1.classList.add('preloadDocClass');
			runBox3I3.classList.add('preloadDocClass');

			positionOnReload(servicesBox1, runBox1T);
			positionOnReload(servicesBox2, runBox1D);
			positionOnReload(servicesBox3, runBox2);
			positionOnReload(servicesBox4, runBox3I1);
			positionOnReload(servicesBox6, runBox3I3);

			runBox1T.style.opacity = 0;
			runBox1D.style.opacity = 0;
			runBox2.style.opacity = 0;
			runBox3I1.style.opacity = 0;
			runBox3I3.style.opacity = 0;

			// OBSERVER FOR SERVICES BOX1:
			const observerBox1 = new IntersectionObserver(
				entries => {
					entries.forEach(({ isIntersecting }) => {
						if (isIntersecting) {
							document.addEventListener('scroll', () => {
								runBox1T.classList.remove('preloadDocClass');

								const scrolledBox1 =
									(d.clientHeight || b.clientHeight) -
									servicesBox1.getBoundingClientRect().y;
								const startAnimation1 = runBox1T[sh] * ratio1;
								const translateY1 =
									runBox1T[sh] - (scrolledBox1 - startAnimation1);

								serviceBoxAnimation(
									scrolledBox1,
									servicesBox1,
									startAnimation1,
									translateY1,
									ratio2,
									runBox1T
								);
							});
						}
					});
				},
				{
					threshold: thresholdRatio,
				}
			);
			observerBox1.observe(servicesBox1);

			// OBSERVER FOR SERVICES BOX2:
			const observerBox2 = new IntersectionObserver(
				entries => {
					entries.forEach(({ isIntersecting }) => {
						if (isIntersecting) {
							document.addEventListener('scroll', () => {
								runBox1D.classList.remove('preloadDocClass');

								const scrolledBox2 =
									(d.clientHeight || b.clientHeight) -
									servicesBox2.getBoundingClientRect().y -
									runBox1D[sh];
								const startAnimation2 = runBox1D[sh] * ratio1;
								const translateY2 =
									runBox1D[sh] - (scrolledBox2 - startAnimation2);

								serviceBoxAnimation(
									scrolledBox2,
									servicesBox2,
									startAnimation2,
									translateY2,
									ratio2,
									runBox1D
								);
							});
						}
					});
				},
				{
					threshold: thresholdRatio,
				}
			);
			observerBox2.observe(servicesBox2);

			// OBSERVER FOR SERVICES BOX3:
			const observerBox3 = new IntersectionObserver(
				entries => {
					entries.forEach(({ isIntersecting }) => {
						if (isIntersecting) {
							document.addEventListener('scroll', () => {
								runBox2.classList.remove('preloadDocClass');

								const scrolledBox3 =
									(d.clientHeight || b.clientHeight) -
									servicesBox3.getBoundingClientRect().y;
								const startAnimation3 = runBox2[sh] * ratio1;
								const translateY3 =
									runBox2[sh] - (scrolledBox3 - startAnimation3);

								serviceBoxAnimation(
									scrolledBox3,
									servicesBox3,
									startAnimation3,
									translateY3,
									ratio2,
									runBox2
								);
							});
						}
					});
				},
				{
					threshold: thresholdRatio,
				}
			);
			observerBox3.observe(servicesBox3);

			// OBSERVER FOR SERVICES BOX4:
			const observerBox4 = new IntersectionObserver(
				entries => {
					entries.forEach(({ isIntersecting }) => {
						if (isIntersecting) {
							document.addEventListener('scroll', () => {
								runBox3I1.classList.remove('preloadDocClass');

								const scrolledBox4 =
									(d.clientHeight || b.clientHeight) -
									servicesBox4.getBoundingClientRect().y;
								const startAnimation4 = runBox3I1[sh] * ratio1;
								const translateY4 =
									runBox3I1[sh] - (scrolledBox4 - startAnimation4);

								serviceBoxAnimation(
									scrolledBox4,
									servicesBox4,
									startAnimation4,
									translateY4,
									ratio2,
									runBox3I1
								);
							});
						}
					});
				},
				{
					threshold: thresholdRatio,
				}
			);
			observerBox4.observe(servicesBox4);

			// OBSERVER FOR SERVICES BOX6:
			const observerBox6 = new IntersectionObserver(
				entries => {
					entries.forEach(({ isIntersecting }) => {
						if (isIntersecting) {
							document.addEventListener('scroll', () => {
								runBox3I3.classList.remove('preloadDocClass');

								const scrolledBox6 =
									(d.clientHeight || b.clientHeight) -
									servicesBox6.getBoundingClientRect().y;
								const startAnimation6 = runBox3I3[sh] * ratio1;
								const translateY6 =
									runBox3I3[sh] - (scrolledBox6 - startAnimation6);

								serviceBoxAnimation(
									scrolledBox6,
									servicesBox6,
									startAnimation6,
									translateY6,
									ratio2,
									runBox3I3
								);
							});
						}
					});
				},
				{
					threshold: thresholdRatio,
				}
			);
			observerBox6.observe(servicesBox6);
		}
	}
}
