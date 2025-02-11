import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());

app.get('/api/test', (req, res) => {
    res.send('Endpoint de prueba funcionando correctamente');
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});