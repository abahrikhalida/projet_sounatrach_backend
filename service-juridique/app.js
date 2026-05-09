const express = require('express');
const cors    = require('cors');
const morgan  = require('morgan');

const directionRoutes   = require('./routes/directionRoutes');
const departementRoutes = require('./routes/departementRoutes');
const errorHandler      = require('./middleware/errorHandler');
const activiteRoutes = require('./routes/activiteRoutes');



const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (req, res) => res.json({ status: 'UP', service: 'service-juridique' }));
app.get('/info',   (req, res) => res.json({ app: 'service-juridique' }));

app.use('/juridique/directions',   directionRoutes);
app.use('/juridique/departements', departementRoutes);
app.use('/juridique/activites', activiteRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} non trouvée` });
});

app.use(errorHandler);

module.exports = app;