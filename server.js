const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const pool = require('./db'); // Importa la conexión a la base de datos

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware para analizar JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'src', 'templates')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'templates', 'index.html'));
});

// Ruta para registro de usuarios
app.post('/register', async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        
        // Validar datos de entrada
        if (!username || !email || !password) {
            return res.status(400).send('Todos los campos son obligatorios');
        }
        
        // Verificar si el usuario ya existe
        const [existingUsers] = await pool.query(
            'SELECT * FROM usuario WHERE email = ?', 
            [email]
        );
        
        if (existingUsers.length > 0) {
            return res.status(409).send('El usuario ya existe');
        }
        
        // Hash de la contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        // Insertar usuario en la base de datos
        const [result] = await pool.query(
            'INSERT INTO usuario (username, email, password, role) VALUES (?, ?, ?, ?)',
            [username, email, hashedPassword, role || 'user']
        );
        
        res.status(201).send('Usuario registrado correctamente');
    } catch (error) {
        console.error('Error en registro:', error);
        res.status(500).send('Error en el servidor');
    }
});

// Ruta para inicio de sesión
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Validar datos de entrada
        if (!email || !password) {
            return res.status(400).send('Email y contraseña son obligatorios');
        }
        
        // Buscar usuario en la base de datos
        const [users] = await pool.query(
            'SELECT * FROM usuario WHERE email = ?',
            [email]
        );
        
        if (users.length === 0) {
            return res.status(401).send('Credenciales incorrectas');
        }
        
        const user = users[0];
        
        // Verificar contraseña
        const passwordMatch = await bcrypt.compare(password, user.password);
        
        if (!passwordMatch) {
            return res.status(401).send('Credenciales incorrectas');
        }
        
        // Aquí podrías implementar JWT para sesiones
        // const token = jwt.sign({ userId: user.id }, 'tu_secreto_jwt', { expiresIn: '1h' });
        
        res.status(200).send('Inicio de sesión exitoso');
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).send('Error en el servidor');
    }
});

app.listen(PORT, () => {
    console.log(`La aplicación está en línea en el puerto ${PORT}`);
});