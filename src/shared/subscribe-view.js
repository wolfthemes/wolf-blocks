/**
 * Shared frontend behaviour for the newsletter subscription blocks.
 *
 * Provider-agnostic: each form root carries `data-provider`, `data-list-id`
 * and `data-rest-url`, which are posted to the Wolf Blocks subscribe route.
 * Both the Mailchimp and Brevo blocks render the same markup/classes, so this
 * single binder drives both. Re-runnable: forms are flagged once bound, so
 * loading it from more than one block on a page is harmless.
 */
export function initSubscribeForms() {
	document.querySelectorAll('.wolf-blocks-subscribe-form').forEach(root => {
		if (root.dataset.bound === 'true') {
			return;
		}

		const form = root.querySelector('.wolf-blocks-subscribe-form__form');
		const messageEl = root.querySelector(
			'.wolf-blocks-subscribe-form__message'
		);

		if (!form || !messageEl) {
			return;
		}

		root.dataset.bound = 'true';

		const {
			provider,
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
			input.setAttribute('aria-describedby', messageEl.id || 'wbsf-msg');
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

			const nameInput = form.querySelector('input[name="wolf_name"]');

			if (nameInput && !nameInput.value.trim()) {
				setFieldError(nameInput, emptyName);
				return;
			}

			const emailInput = form.querySelector('input[name="wolf_email"]');
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
				const body = { provider, list_id: listId, email };
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
}
