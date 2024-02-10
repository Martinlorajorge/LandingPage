document.addEventListener('DOMContentLoaded', function () {
	const $form = document.querySelector('#form');
	const $status = document.getElementById('my-form-status');

	function clearStatus() {
		$status.innerHTML = ''; // Limpiar el contenido del elemento
	}

	$form.addEventListener('submit', async function (event) {
		event.preventDefault();
		var status = document.getElementById('my-form-status');
		const form = new FormData($form);
		try {
			const response = await fetch($form.action, {
				method: 'POST',
				body: form,
				headers: {
					Accept: 'application/json', // Corregido: 'header' a 'headers'
				},
			});
			if (response.ok) {
				status.innerHTML = 'Gracias por su mensaje, contestaré a la brevedad'; // Corregido: Corregido el texto del mensaje
				alert('Formulario enviado correctamente');
				$form.reset();
				return;
			} else {
				throw new Error('Error al enviar el formulario');
			}
		} catch (error) {
			console.error('Error:', error.message);
		}

		// Validación de campos (se movió dentro del listener del submit)
		const nombre = document.getElementById('nombre');
		const asunto = document.getElementById('asunto');
		const email = document.getElementById('email');
		const mensaje = document.getElementById('mensaje');
		const error = document.getElementById('error');
		const errores = [];
		clearStatus();
		// Validar Nombre
		if (!nombre.value) {
			errores.push('Por favor ingresa tu nombre.');
			nombre.placeholder = 'Por favor ingresa tu nombre.';
			nombre.classList.add('error');
		} else {
			nombre.classList.remove('error');
		}

		// Validar Asunto
		if (!asunto.value) {
			errores.push('Por favor ingresa un asunto.');
			asunto.placeholder = 'Por favor ingresa un asunto.';
			asunto.classList.add('error');
		} else {
			asunto.classList.remove('error');
		}

		// Validar Email
		if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
			errores.push('Por favor ingresa un correo electrónico válido.');
			email.placeholder = 'Por favor ingresa un correo electrónico válido.';
			email.classList.add('error');
		} else {
			email.classList.remove('error');
		}

		// Validar Mensaje
		if (!mensaje.value) {
			errores.push('Por favor ingresa tu mensaje.');
			mensaje.placeholder = 'Por favor ingresa tu mensaje.';
			mensaje.classList.add('error');
		} else {
			mensaje.classList.remove('error');
		}

		if (errores.length === 0) {
			$form.submit();
		} else {
			console.error('Errores de validación:', errores);
		}
	});
});
