const express = require('express');
const connectDB = require('./config/db');
const carRoutes = require('./routes/carRoutes');
const cors = require('cors');
const app = express();

connectDB();
const corsOptions = {
  origin: 'https://car-management-omega.vercel.app/'||'https://car-management-priyanshyvs-projects.vercel.app',  // Allow only the frontend URL
  methods: 'GET,POST,PUT,DELETE',  // Allowed HTTP methods
  allowedHeaders: 'Content-Type,Authorization',  // Allowed headers 
  credentials: true,
  };
  app.use(cors(corsOptions));
app.use(express.json());

app.use('/api', carRoutes);

const PORT = process.env.PORT || 9001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
