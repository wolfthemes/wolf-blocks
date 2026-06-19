document.querySelectorAll('.wolf-blocks-mailchimp-form').forEach(root => {
	const form = root.querySelector('.wolf-blocks-mailchimp-form__form');
	const messageEl = root.querySelector(
		'.wolf-blocks-mailchimp-form__message'
	);

	if (!form || !messageEl) {
		return;
	}

	const listId = root.dataset.listId;
	const nonce = root.dataset.nonce;
	const successMsg = root.dataset.successMessage;
	const errorMsg = root.dataset.errorMessage;
	const restUrl = root.dataset.restUrl;

	function showMessage(text, isError) {
		messageEl.textContent = text;
		messageEl.dataset.type = isError ? 'error' : 'success';
		messageEl.removeAttribute('hidden');
	}

	form.addEventListener('submit', async e => {
		e.preventDefault();

		const emailInput = form.querySelector('input[name="mc_email"]');
		const email = emailInput?.value.trim();
		if (!email) {
			emailInput?.focus();
			return;
		}

		const nameInput = form.querySelector('input[name="mc_name"]');
		const submitBtn = form.querySelector('button[type="submit"]');

		submitBtn.disabled = true;
		messageEl.setAttribute('hidden', '');

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
				showMessage(successMsg, false);
			} else {
				showMessage(data.message || errorMsg, true);
			}
		} catch {
			showMessage(errorMsg, true);
		} finally {
			submitBtn.disabled = false;
		}
	});
});
