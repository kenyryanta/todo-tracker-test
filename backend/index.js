import express from 'express';
import cors from 'cors';
import todoRoutes from './routes/todoRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import db from './models/index.cjs'; // Impor db
const { sequelize } = db; // Ambil sequelize dari db
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Izinkan cross-origin requests
app.use(express.json()); // Body parser untuk JSON

// Test DB Connection
const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
testDbConnection();

// Routes
app.use('/todos', todoRoutes); // Arahkan semua request /todos ke router

// Error Handling Middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});