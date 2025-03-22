const express = require('express');
const bodyParser = require('body-parser');
const { loginUser, registerUser } = require('./Conexion');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await loginUser(email, password);
    if (user) {
      res.send('Login successful');
    } else {
      res.send('Invalid email or password');
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.post('/register', async (req, res) => {
  const { id, username, email, password } = req.body;
  try {
    const user = await registerUser(id, username, email, password);
    if (user) {
      res.send('Registration successful');
    } else {
      res.send('Registration failed');
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});