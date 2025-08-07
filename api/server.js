const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const path = require('path');
require('dotenv').config();

// Create Express app
const app = express();

// Middleware
app.use(express.json());

// CORS Configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Development origins
    const devOrigins = [
      'http://localhost:5174',
      'http://localhost:3000'
    ];
    
    // Production origins - allow Vercel preview and production URLs
    const vercelUrl = process.env.VERCEL_URL || '';
    const prodOrigins = [
      `https://${vercelUrl}`,
      `https://${vercelUrl.replace('https://', '')}`,
      `https://${vercelUrl.replace('https://', 'www.')}`,
      `https://${vercelUrl.split('.')[0]}-git-main-${process.env.VERCEL_GIT_REPO_OWNER}.vercel.app`,
      `https://${process.env.VERCEL_GIT_REPO_SLUG}-${process.env.VERCEL_GIT_COMMIT_REF}.vercel.app`
    ].filter(Boolean);
    
    const allowedOrigins = process.env.NODE_ENV === 'production' 
      ? [...new Set([...devOrigins, ...prodOrigins])]
      : ['*'];
    
    if (allowedOrigins.includes('*') || allowedOrigins.some(o => origin.startsWith(o))) {
      callback(null, true);
    } else {
      console.log('CORS blocked for origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-requested-with'],
  exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar']
};

// Enable CORS for all routes
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable preflight for all routes

// Connect to MongoDB
connectDB();

// Import routes after DB connection is established
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  
  // Handle client-side routing - return all requests to the app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? {} : err.message
  });
});

// Export the Express API for Vercel serverless functions
module.exports = app;

// Global error handlers
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Consider logging to an external service here
});

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Handle server errors
export const closeServer = () => {
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
};

// Handle termination signals
process.on('SIGTERM', closeServer);
process.on('SIGINT', closeServer);
