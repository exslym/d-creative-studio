import '../styles/index.scss';
import { common } from './_common';
import { footer } from './_footer';
import { headerLogoButton } from './_functions';
import { homePage } from './_homePage';
import { popup } from './_popup';
import { projectsPage } from './_projectsPage';
import { onResize } from './_resizingActions';
import { smoothScroll } from './_smoothScroll';

if (process.env.NODE_ENV === 'development') {
	require('../index.html');
	require('../projects.html');
}

window.addEventListener('DOMContentLoaded', function () {
	'use strict';

	onResize();

	common();

	homePage();

	projectsPage();

	footer();

	smoothScroll('anchor');

	headerLogoButton('logoButton');

	popup('popup');
});

//! Add mobile devices landscape resolutions
