require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const productsRouter = require('./routes/products');
const importsRouter = require('./routes/imports');
const { seedIfEmpty } = require('./seed');

const app = express();

app.use(
    cors({
        origin: (origin, cb) => cb(null, true),
        credentials: true,
    })
);
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.json({
        name: 'Import Export Hub API',
        status: 'ok',
        endpoints: ['/api/products', '/api/imports'],
    });
});

app.use('/api/products', productsRouter);
app.use('/api/imports', importsRouter);

app.use((err, req, res, next) => {
    // eslint-disable-line no-unused-vars
    console.error('[error]', err.message);
    res.status(500).json({ message: err.message || 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/import_export_hub';

async function start() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('[mongo] connected:', MONGODB_URI);
        await seedIfEmpty();
    } catch (err) {
        console.warn('[mongo] connection failed:', err.message);
        console.warn('[mongo] API will respond but DB-backed routes will fail until Mongo is available.');
    }
    app.listen(PORT, () => console.log(`[server] listening on http://localhost:${PORT}`));
}

start();
