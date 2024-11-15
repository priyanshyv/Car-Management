const express = require('express');
const connectDB = require('./config/db');
const carRoutes = require('./routes/carRoutes');
const cors = require('cors');
const app = express();

connectDB();
const corsOptions = {
    origin: 'https://car-management-priyanshyvs-projects.vercel.app/',  // Allow only your frontend URL
    credentials: true,               // Allow credentials (cookies, etc.)
  };
  app.use(cors(corsOptions));
app.use(express.json());

app.use('/api', carRoutes);

const PORT = process.env.PORT || 9001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
