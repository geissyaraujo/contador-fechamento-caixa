const express = require('express');
const path = require('path');

const app = express();

// Serve os arquivos estáticos da pasta /src
app.use(express.static(path.join(__dirname, 'src')));

// Serve a pasta de assets (imagens, ícones, etc.)
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Redireciona a raiz para login.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'login.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Frontend rodando em http://localhost:${PORT}`);
});