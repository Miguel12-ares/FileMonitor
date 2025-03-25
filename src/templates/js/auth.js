document.addEventListener('DOMContentLoaded', function() {
    /**
     * Formulario de inicio de sesión
     */
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener valores del formulario
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Validación básica
            if (!email || !password) {
                alert('Por favor, completa todos los campos');
                return;
            }
            
            // En un caso real, aquí se enviarían los datos al servidor
            console.log('Iniciando sesión con:', { email });
            
            // Simulación de inicio de sesión exitoso
            setTimeout(function() {
                window.location.href = 'dashboard.html';
            }, 1000);
        });
    }
    
    /**
     * Formulario de registro
     */
    const registerForm = document.getElementById('registerForm');
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener valores del formulario
            const userId = document.getElementById('userId').value;
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Validación básica
            if (!userId || !username || !email || !password || !confirmPassword) {
                alert('Por favor, completa todos los campos');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Las contraseñas no coinciden');
                return;
            }
            
            // En un caso real, aquí se enviarían los datos al servidor
            console.log('Registrando usuario:', { userId, username, email });
            
            // Simulación de registro exitoso
            setTimeout(function() {
                window.location.href = 'dashboard.html';
            }, 1000);
        });
    }
});