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


// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());



app.use(cors({
  origin: 'https://fvg-global-assist.webflow.io', // ✅ Replace this with your actual Webflow domain
  credentials: true
}));
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

// Root route to check DB status
app.get('/', (req, res) => {
 res.send("Hello")
});

// Routes
app.use('/api', userRoutes);
app.use('/apply', applyRoutes);

// Start server
app.listen(3000, () => console.log("Server running on port 3000"));
