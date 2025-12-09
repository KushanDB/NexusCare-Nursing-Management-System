import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// Import routes
import authRoutes from './routes/authRoutes.js';
import nurseRoutes from './routes/nurseRoutes.js';
import patientRoutes from './routes/patientRoutes.js';
import assignmentRoutes from './routes/assignmentRoutes.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Allow frontend to connect
app.use(express.json()); // Parse JSON data

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/nurses', nurseRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/assignments', assignmentRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Nursing Management System API is running' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
