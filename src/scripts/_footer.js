import emailjs from '@emailjs/browser';
import {
	clearForm,
	orderButtonAnimation,
	resetOrderButton,
	setOrderButton,
} from './_functions';
import { sendMessage } from './_sendMessage';

export function footer() {
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

	//ORDER BLOCK:
	if (document.querySelector('footer')) {
		const selectMenu = document.getElementById('tool');
		const subjectField = document.querySelector('.subject');

		selectMenu.addEventListener('change', function selectedItem(e) {
			subjectField.textContent = e.target.value;
		});

		//PHONE VALIDATION:
		$('#contactForm')
			.find('[name="phone"]')
			.intlTelInput({
				utilsScript: '../../tools/utils.js',
				autoPlaceholder: true,
				preferredCountries: ['ru', 'kz'],
			});

		const orderButton = document.querySelectorAll('.orderButton');
		const user = document.getElementById('user');
		const tool = document.getElementById('tool');
		const email = document.getElementById('email');
		const phone = document.getElementById('phone');
		const prefix = document.getElementById('prefix');
		const privacyCheckBox = document.getElementById('privacy');
		let form = {};

		const phonePrefixArea = String(
			document
				.querySelector('.iti__selected-flag')
				.getAttribute('title')
				.split(':')
				.splice(-1, 1)
		).trim();
		prefix.textContent = phonePrefixArea;

		//GET PREFIX FROM FLAG SELECTOR
		if (x <= 500 || isMobileDevice) {
			$('footer').on('click', '.iti__selected-flag', function () {
				$('#iti-0__country-listbox').on('click', '.iti__country', function () {
					document.querySelector('[name="phone"]').value = '';
					const currentPrefix = this.getAttribute('data-dial-code');
					prefix.textContent = `+${currentPrefix}`;
				});
			});
		} else {
			$('#contactForm').on('click', '.iti__country', function () {
				document.querySelector('[name="phone"]').value = '';
				const currentPrefix = this.getAttribute('data-dial-code');
				prefix.textContent = `+${currentPrefix}`;
			});
		}

		//PRIVACY CHECKBOX TEST:
		privacyCheckBox.addEventListener('click', () => {
			if (privacyCheckBox.checked) {
				privacyCheckBox.setAttribute('checked', '');
				privacyCheckBox.classList.remove('errorCheckbox');
				orderButton.forEach(button => {
					button.disabled = false;
					button.style.pointerEvents = 'auto';
					button.style.opacity = '1';
				});
			} else {
				privacyCheckBox.removeAttribute('checked', '');
				privacyCheckBox.classList.add('errorCheckbox');
				orderButton.forEach(button => {
					button.disabled = true;
					button.style.pointerEvents = 'none';
					button.style.opacity = '0.3';
				});
			}
		});

		//ORDER BUTTON CLICK:
		const orderRound = document.querySelectorAll('.roundAnimation');

		orderButton.forEach(button => {
			button.addEventListener('click', e => {
				if (privacyCheckBox.checked) {
					privacyCheckBox.classList.remove('errorCheckbox');
					button.disabled = false;
					e.preventDefault();
					const emailCheckRegExp =
						/^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
					const phoneCheckRegExp =
						/\(?[0-9]{3,4}\)?[\s-]?[0-9]{2,4}[\s-]?[0-9]{2,3}[\s-]?[0-9]{2,3}/;
					if (
						user.value === '' ||
						emailCheckRegExp.test(email.value) === false ||
						phoneCheckRegExp.test(phone.value) === false
					) {
						resetOrderButton(orderRound, orderButton);

						//user field:
						if (user.value === '') {
							user.placeholder = 'укажите название компании / имя';
							user.classList.add('error');
						} else {
							user.placeholder = 'название компании / имя';
							user.classList.remove('error');
						}
						//email field:
						if (email.value === '') {
							email.classList.add('error');
							email.classList.add('errorFontSize');
							email.placeholder = 'укажите Ваш email';

							setTimeout(() => {
								email.placeholder = 'email@domen.com';
								clearTimeout();
							}, 3000);
						} else if (emailCheckRegExp.test(email.value) === false) {
							email.value = '';
							email.classList.add('error');
							email.classList.add('errorFontSize');
							email.placeholder = 'некорректный email';

							setTimeout(() => {
								email.placeholder = 'email@domen.com';
								clearTimeout();
							}, 3000);
						} else {
							email.classList.remove('error');
							email.classList.remove('errorFontSize');
							email.placeholder = 'email@domen.com';
						}
						//phone field:
						if (phone.value === '') {
							phone.classList.add('error');
							phone.classList.add('errorFontSize');
							phone.placeholder = 'укажите номер';

							setTimeout(() => {
								phone.placeholder = '(999) 999-99-99';
								clearTimeout();
							}, 3000);
						} else if (phoneCheckRegExp.test(phone.value) === false) {
							phone.value = '';
							phone.classList.add('error');
							phone.classList.add('errorFontSize');
							phone.placeholder = 'некорректный номер';

							setTimeout(() => {
								phone.placeholder = '(999) 999-99-99';
								clearTimeout();
							}, 3000);
						} else {
							phone.classList.remove('error');
							phone.classList.remove('errorFontSize');
							phone.placeholder = '(999) 999-99-99';
						}
					} else {
						setOrderButton(orderRound, orderButton);

						const serviceID = process.env.WEBPACK_EMAILJS_SERVICE_ID;
						const templateID = process.env.WEBPACK_EMAILJS_TEMPLATE_ID;
						const publicKey = process.env.WEBPACK_EMAILJS_PUBLIC_KEY;
						const toName = process.env.WEBPACK_EMAILJS_TO_NAME;
						const toEmail = process.env.WEBPACK_EMAILJS_TO_EMAIL;

						form = {
							from_name: user.value,
							to_name: toName,
							from_email: email.value,
							to_email: toEmail,
							message: tool.value,
							phone: `${prefix.textContent}${phone.value.replace(
								/[\s-(?)?]+/g,
								''
							)}`,
						};
						// console.log(form);
						// console.log(publicKey);

						emailjs.send(serviceID, templateID, form, publicKey).then(
							function (response) {
								console.log('SUCCESS!', response.status, response.text);
								document.querySelector('.success').click();
								resetOrderButton(orderRound, orderButton);
								clearForm(user, email, phone);
								sendMessage('order_send_success');
							},
							function (error) {
								console.log('FAILED...', error);
								document.querySelector('.error').click();
								resetOrderButton(orderRound, orderButton);
								sendMessage('order_send_error');
							}
						);
					}
				}
			});
		});

		//CIRCLE ANIMATION ON SCROLL:
		if (document.querySelector('.roundAnimation')) {
			const d = document.documentElement;
			const b = document.body;
			const sh = 'scrollHeight';
			const orderRound = document.querySelectorAll('.roundAnimation');
			const footer = document.querySelector('footer');
			const footerHeight = footer[sh]; // 1608
			const startAnimation = footerHeight / 1.6; // 1005

			const observer = new IntersectionObserver(
				entries => {
					entries.forEach(({ isIntersecting }) => {
						if (isIntersecting) {
							document.addEventListener('scroll', () => {
								const scrolledFooter =
									(d.clientHeight || b.clientHeight) -
									footer.getBoundingClientRect().y; // 0 - 1608
								const startDeg = scrolledFooter - startAnimation; // 0 - 180

								// console.log(`footerHeight: ${footerHeight}`); // 1608
								// console.log(`startAnimation: ${startAnimation}`); // 1005
								// console.log(`scrolledFooter: ${scrolledFooter}`); // 0 - 1608
								// console.log(`startDeg: ${startDeg}`); // 0 - 180

								orderButtonAnimation(
									scrolledFooter,
									startAnimation,
									startDeg,
									orderRound
								);
							});
						}
					});
				},
				{
					threshold: 0.3,
				}
			);
			observer.observe(footer);
		}
	}
}
