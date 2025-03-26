document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Basic client-side validation
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const termsCheckbox = document.getElementById('terms');

        // Check if passwords match
        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        // Check if terms are accepted
        if (!termsCheckbox.checked) {
            alert('Debe aceptar los Términos y Condiciones');
            return;
        }

        // Prepare user data
        const userData = {
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            password: password,
            role: 'user' // Default role, can be modified as needed
        };

        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                const result = await response.text();
                alert('Registro exitoso: ' + result);
                // Optionally redirect to login page
                window.location.href = '/login.html';
            } else {
                const errorText = await response.text();
                alert('Error en el registro: ' + errorText);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Ocurrió un error durante el registro');
        }
    });
});