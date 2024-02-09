document.addEventListener('DOMContentLoaded', function () {
	const form = document.querySelector('form');

	form.addEventListener('submit', function (event) {
		event.preventDefault();

		const nombre = document.getElementById('nombre').value;
		const asunto = document.getElementById('asunto').value;
		const correo = document.getElementById('correo').value;
		const mensaje = document.getElementById('mensaje').value;

		const data = {
			to: correo,
			from: 'chatmartinlorajorge@gmail.com',
			subject: asunto,
			text: `Nombre: ${nombre}\nCorreo: ${correo}\nMensaje: ${mensaje}`,
		};

		fetch('https://api.sendgrid.com/v3/mail/send', {
			mode: 'no-cors',
			method: 'POST',
			headers: {
				Authorization:
					'Bearer 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',
				'Content-Type': 'application/json',
			},

			body: JSON.stringify(data),
		})
			.then((response) => {
				if (response.ok) {
					console.log('Correo enviado con éxito');
				} else {
					console.error('Error al enviar el correo');
				}
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	});
});
