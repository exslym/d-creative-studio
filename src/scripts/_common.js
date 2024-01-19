export function common() {
	const w = window;
	const d = document;
	const e = d.documentElement;
	const g = d.getElementsByTagName('body')[0];
	const x = w.innerWidth || e.clientWidth || g.clientWidth;
	const y = w.innerHeight || e.clientHeight || g.clientHeight;
	const isMobileDevice =
		/Android|webOS|Macintosh|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent
		) && navigator.maxTouchPoints > 1;

	//CURSOR:
	if (document.querySelector('#customCursor')) {
		const customCursor = document.querySelector('#customCursor');
		if (isMobileDevice || x <= 1180) {
			customCursor.style.display = 'none';
		} else {
			document.addEventListener('mousemove', e => {
				customCursor.style.left = `${e.clientX}px`;
				customCursor.style.top = `${e.clientY}px`;
			});
			window.addEventListener('scroll', e => {
				customCursor.style.left = `${e.clientX}px`;
				customCursor.style.top = `${e.clientY}px`;
			});
		}
	}

	//плавное раскрытие меню:
	if (document.querySelector('#burger')) {
		const burger = document.querySelector('#burger');
		const menu = document.querySelector('#menu');
		const main = document.querySelector('.main');
		const footer = document.querySelector('.footer');
		const menuItems = document.querySelectorAll('.menu__item');

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

		menuItems.forEach(item => {
			item.addEventListener('click', () => {
				burger.classList.remove('tap-to-close');
				burger.classList.add('tap-to-open');

				burger.classList.remove('open-menu');
				burger.classList.add('close-menu');
				menu.classList.remove('open-menu');
				menu.classList.add('close-menu');

				document.body.classList.remove('overflow-hidden');
				main.classList.remove('non-visible');
				footer.classList.remove('non-visible');
			});
		});
	}
}
