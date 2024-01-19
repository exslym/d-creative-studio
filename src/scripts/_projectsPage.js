export function projectsPage() {
	const w = window;
	const d = document;
	const e = d.documentElement;
	const g = d.getElementsByTagName('body')[0];
	const x = w.innerWidth || e.clientWidth || g.clientWidth;

	//SLIDER:
	if (document.querySelector(`.slideBlock`)) {
		let sliderMargin = 20;
		let itemsCol = 2;

		if (x > 1024) {
			sliderMargin = 40;
		} else if (x > 768 && x <= 1024) {
			sliderMargin = 30;
		} else if (x <= 680) {
			itemsCol = 1;
		}

		$(function () {
			let slider = $(`.slideBlock`);
			slider.owlCarousel({
				startPosition: 0,
				autoplay: false,
				autoplayTimeout: 5000,
				autoplaySpeed: false,
				autoplayHoverPause: false,
				items: itemsCol,
				margin: sliderMargin,
				smartSpeed: 800,
				autoHeight: false,
				loop: true,
				nav: false,
				dotsContainer: false,
				dots: false,
			});
			$(`.nextButton`).click(function () {
				slider.trigger('next.owl.carousel');
			});
			$(`.prevButton`).click(function () {
				slider.trigger('prev.owl.carousel');
			});
		});
	}
}
