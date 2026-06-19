document.querySelectorAll('.wolf-blocks-mailchimp-form').forEach(root => {
	const form = root.querySelector('.wolf-blocks-mailchimp-form__form');
	const messageEl = root.querySelector(
		'.wolf-blocks-mailchimp-form__message'
	);

	if (!form || !messageEl) {
		return;
	}

	const {
		listId,
		nonce,
		restUrl,
		emptyEmail,
		invalidEmail,
		emptyName,
		successMessage,
		errorMessage,
	} = root.dataset;

	function showMessage(text, type) {
		messageEl.textContent = text;
		messageEl.dataset.type = type; // 'success' | 'error' | 'validation'
		messageEl.removeAttribute('hidden');
	}

	function hideMessage() {
		messageEl.setAttribute('hidden', '');
		delete messageEl.dataset.type;
	}

	function setFieldError(input, message) {
		input.setAttribute('aria-invalid', 'true');
		input.setAttribute('aria-describedby', messageEl.id || 'mcf-msg');
		showMessage(message, 'validation');
		input.focus();
	}

	function clearFieldErrors() {
		form.querySelectorAll('input').forEach(input => {
			input.removeAttribute('aria-invalid');
			input.removeAttribute('aria-describedby');
		});
	}

	// Simple RFC-compliant email check.
	function isValidEmail(value) {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
	}

	form.addEventListener('submit', async e => {
		e.preventDefault();
		clearFieldErrors();
		hideMessage();

		// Declare each variable only after any early return that precedes its use.
		const nameInput = form.querySelector('input[name="mc_name"]');

		if (nameInput && !nameInput.value.trim()) {
			setFieldError(nameInput, emptyName);
			return;
		}

		const emailInput = form.querySelector('input[name="mc_email"]');
		const email = emailInput?.value.trim();

		if (!email) {
			setFieldError(emailInput, emptyEmail);
			return;
		}

		if (!isValidEmail(email)) {
			setFieldError(emailInput, invalidEmail);
			return;
		}

		const submitBtn = form.querySelector('button[type="submit"]');
		submitBtn.disabled = true;

		try {
			const body = { list_id: listId, email };
			if (nameInput) {
				body.name = nameInput.value.trim();
			}

			const res = await fetch(restUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-WP-Nonce': nonce,
				},
				body: JSON.stringify(body),
			});

			const data = await res.json();

			if (res.ok && data.success) {
				form.reset();
				showMessage(successMessage, 'success');
			} else {
				showMessage(data.message || errorMessage, 'error');
			}
		} catch {
			showMessage(errorMessage, 'error');
		} finally {
			submitBtn.disabled = false;
		}
	});

	// Clear field error state as the user types.
	form.querySelectorAll('input').forEach(input => {
		input.addEventListener('input', () => {
			if (input.getAttribute('aria-invalid') === 'true') {
				input.removeAttribute('aria-invalid');
				hideMessage();
			}
		});
	});
});
