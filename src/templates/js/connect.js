document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Basic client-side validation
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Prepare user data
        const userData = {
            email: email,
            password: password
        };

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                const result = await response.text();
                alert('Inicio de sesión exitoso: ' + result);
                // Optionally redirect to a different page after login
                window.location.href = '/dashboard.html';
            } else {
                const errorText = await response.text();
                alert('Error en el inicio de sesión: ' + errorText);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Ocurrió un error durante el inicio de sesión');
        }
    });
});