function pad( n ) {
	return String( n ).padStart( 2, '0' );
}

function showExpired( el, text ) {
	const units = el.querySelector( '.wolf-blocks-countdown__units' );
	if ( units ) {
		units.outerHTML = `<span class="wolf-blocks-countdown__expired">${ text }</span>`;
	}
}

document.querySelectorAll( '.wolf-blocks-countdown' ).forEach( ( el ) => {
	const targetRaw = el.dataset.target;
	const expiredText =
		el.dataset.expiredText || '';
	const showDays = el.dataset.showDays !== 'false';
	const showSeconds = el.dataset.showSeconds !== 'false';

	if ( ! targetRaw ) {
		showExpired( el, expiredText );
		return;
	}

	const target = new Date( targetRaw ).getTime();

	if ( isNaN( target ) || target <= Date.now() ) {
		showExpired( el, expiredText );
		return;
	}

	const daysUnit = el.querySelector( '[data-unit="days"] strong' );
	const hoursUnit = el.querySelector( '[data-unit="hours"] strong' );
	const minutesUnit = el.querySelector( '[data-unit="minutes"] strong' );
	const secondsUnit = el.querySelector( '[data-unit="seconds"] strong' );

	const interval = setInterval( () => {
		const remaining = target - Date.now();

		if ( remaining <= 0 ) {
			clearInterval( interval );
			showExpired( el, expiredText );
			return;
		}

		const totalSeconds = Math.floor( remaining / 1000 );
		const seconds = totalSeconds % 60;
		const totalMinutes = Math.floor( totalSeconds / 60 );
		const minutes = totalMinutes % 60;
		const totalHours = Math.floor( totalMinutes / 60 );
		const hours = showDays ? totalHours % 24 : totalHours;
		const days = Math.floor( totalHours / 24 );

		if ( showDays && daysUnit ) {
			daysUnit.textContent = pad( days );
		}
		if ( hoursUnit ) {
			hoursUnit.textContent = pad( hours );
		}
		if ( minutesUnit ) {
			minutesUnit.textContent = pad( minutes );
		}
		if ( showSeconds && secondsUnit ) {
			secondsUnit.textContent = pad( seconds );
		}
	}, 1000 );
} );
