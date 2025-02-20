const express = require('express');
const cors = require('cors');
const dataRoutes = require('./routes/dataRoutes');
const PORT = 5000;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use( dataRoutes);  // prefix API routes with /api

app.listen(PORT, () => console.log(`Server is listening at ${PORT}`));
