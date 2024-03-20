import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import matrixRouter from './routes/matrix.route.js'

const PORT = process.env.PORT || 8000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const FILE_SERVER_PATH = path.join(__dirname, '../public');
const COMMON_FILE_PATH = path.join(__dirname, '../common');

const app = express();

app.use(express.json());

app.use(express.static(FILE_SERVER_PATH));
app.use(express.static(COMMON_FILE_PATH));

app.use('/api/matrix', matrixRouter);

app.listen(8000, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
});