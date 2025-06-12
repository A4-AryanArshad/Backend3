const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('../routes/userRoutes');
const applyRoutes = require('../routes/applyRoutes');
const cors = require('cors');

const app = express();
let isDbConnected = false;

// MongoDB Connection
mongoose.connect('mongodb+srv://nihaarshad5:r6eH4cYY4ZdOprgl@cluster0.o8bu9nt.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("MongoDB connected");
  isDbConnected = true;
})
.catch(err => {
  console.error("MongoDB connection error:", err.message);
});

// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// Root route to check DB status
app.get('/', (req, res) => {
  if (isDbConnected) {
    res.send('MongoDB connected');
  } else {
    res.send('MongoDB not connected');
  }
});

// Routes
app.use('/api', userRoutes);
app.use('/apply', applyRoutes);

// Start server
app.listen(3000, () => console.log("Server running on port 3000"));
