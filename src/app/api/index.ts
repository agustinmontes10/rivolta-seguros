import express from 'express';

const app = express();
const port = 3000;

app.get('/api/test', (req, res) => {
    res.send('Endpoint de prueba funcionando correctamente');
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});