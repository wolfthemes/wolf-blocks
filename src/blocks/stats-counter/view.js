const SEPARATOR_CHARS = {
	default: ',',
	dots: '.',
	space: ' ',
	underscore: '_',
	apostrophe: "'",
};

function formatNumber( num, useSeparator, style ) {
	const rounded = Math.round( num );
	if ( ! useSeparator ) {
		return String( rounded );
	}
	const sep = SEPARATOR_CHARS[ style ] || ',';
	return rounded.toString().replace( /\B(?=(\d{3})+(?!\d))/g, sep );
}

function easeOutQuart( t ) {
	return 1 - Math.pow( 1 - t, 4 );
}

function animateCounter( el ) {
	const startNum = parseInt( el.dataset.start, 10 ) || 0;
	const endNum = parseInt( el.dataset.end, 10 ) || 0;
	const duration = parseInt( el.dataset.duration, 10 ) || 2000;
	const useThousands = el.dataset.thousands === 'true';
	const separatorStyle = el.dataset.separator || 'default';
	const valueEl = el.querySelector( '.wolf-blocks-stats-counter__value' );

	if ( ! valueEl ) {
		return;
	}

	if ( window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches ) {
		valueEl.textContent = formatNumber(
			endNum,
			useThousands,
			separatorStyle
		);
		return;
	}

	const range = endNum - startNum;
	const startTime = performance.now();

	function tick( now ) {
		const elapsed = now - startTime;
		const progress = Math.min( elapsed / duration, 1 );
		const current = startNum + Math.round( range * easeOutQuart( progress ) );
		valueEl.textContent = formatNumber(
			current,
			useThousands,
			separatorStyle
		);
		if ( progress < 1 ) {
			requestAnimationFrame( tick );
		}
	}

	requestAnimationFrame( tick );
}

document.querySelectorAll( '.wolf-blocks-stats-counter' ).forEach( ( el ) => {
	const observer = new IntersectionObserver(
		( entries ) => {
			entries.forEach( ( entry ) => {
				if ( entry.isIntersecting ) {
					animateCounter( entry.target );
					observer.unobserve( entry.target );
				}
			} );
		},
		{ threshold: 0.3 }
	);
	observer.observe( el );
} );
